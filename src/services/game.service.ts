import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
    BehaviorSubject,
    defer,
    EMPTY,
    fromEvent,
    map,
    Observable,
    Subject,
    Subscription,
    switchMap,
    take,
    takeUntil,
    tap,
    timer,
} from 'rxjs';
import { Board } from 'src/models/board';
import { Cell } from 'src/models/cell';
import { Direction } from 'src/models/direction';
import { Options } from 'src/models/options';
import {
    buildDefaultBoard,
    setupSnakeCells,
} from 'src/utils/buildDefaultBoard';
import { findNextFruitCell } from 'src/utils/findNextFruitPosition';
import { getNextHeadPosition } from 'src/utils/getNextHeadPosition';
import { mapKeyToDirection } from 'src/utils/mapKeyToDirection';
import { validatePosition } from 'src/utils/validatePosition';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    board$!: BehaviorSubject<Board>;
    score$!: BehaviorSubject<number>;
    time$!: BehaviorSubject<number>;
    gameOver$!: Subject<void>;
    paused$!: Subject<boolean>;
    inProgress$!: BehaviorSubject<boolean>;
    win$!: Subject<void>;

    private subs!: Subscription;
    private snakeCells: Cell[] = [];
    private direction: Direction = 'up';

    private tick$!: Observable<any>;
    private stopped$!: Subject<void>;

    private options: Options = {
        height: 20,
        width: 20,
        snakeSize: 3,
        speed: 150,
    };

    constructor(@Inject(DOCUMENT) private documentRef: Document) {
        this.subs = new Subscription();

        this.win$ = new Subject<void>();
        this.paused$ = new Subject<boolean>();
        this.stopped$ = new Subject<void>();
        this.time$ = new BehaviorSubject<number>(0);
        this.board$ = new BehaviorSubject<Board>(this.initializeBoard(this.options));
        this.score$ = new BehaviorSubject<number>(0);
        this.gameOver$ = new Subject<void>();
        this.inProgress$ = new BehaviorSubject<boolean>(false);
    }

    start(): void {
        this.tick$ = this.initGameTick();

        this.initTime();
        this.initSnakeTick(this.tick$);
        this.initDirectionChange();
        this.initScoreIncrease();
        this.initGameWin();
        this.initGameOver();

        this.paused$.next(false);
        this.inProgress$.next(true);
    }

    pause() {
        this.paused$.next(true);
    }

    resume() {
        this.paused$.next(false);
    }

    stop() {
        this.stopped$.next();
        this.inProgress$.next(false);
    }

    reset() {
        this.direction = 'up';
        this.board$.next(this.initializeBoard(this.options));
        this.score$.next(0);
        this.inProgress$.next(false);
        this.time$.next(0);
    }

    ngOnDestroy() {
        this.dispose();
    }

    private get Board(): Board {
        return this.board$.value;
    }

    private initGameTick() {
        const ticker$ = timer(0, this.options.speed).pipe(
            takeUntil(this.stopped$)
        );

        const tick$ = this.paused$.pipe(
            takeUntil(this.stopped$),
            switchMap((paused) => {
                if (paused) {
                    return EMPTY;
                }

                return defer(() => ticker$);
            })
        );

        return tick$;
    }

    private initTime() {
        this.subs.add(this.paused$.pipe(takeUntil(this.stopped$),
            switchMap(paused => {
                if (paused) {
                    return EMPTY;
                }

                return timer(0, 1000).pipe(
                    takeUntil(this.stopped$),
                    tap(v => this.time$.next(this.time$.value + 1)),
                    tap(v => console.log(v))
                );
            })).subscribe(() => {})
        );
    }

    private initSnakeTick(tick$: Observable<any>) {
        this.subs.add(
            tick$.pipe(tap(() => console.log('snake tick'))).subscribe(() => {
                this.processSnakeTick(this.Board);
                this.board$.next({ ...this.Board });
            })
        );
    }

    private initDirectionChange() {
        this.subs.add(
            fromEvent(this.documentRef, 'keydown')
                .pipe(
                    takeUntil(this.stopped$),
                    map((e) => (<KeyboardEvent>e).key),
                    tap(() => console.log('keydown'))
                )
                .subscribe((key) => (this.direction = mapKeyToDirection(key)))
        );
    }

    private initScoreIncrease() {
        this.subs.add(
            this.score$
                .pipe(
                    takeUntil(this.stopped$),
                    tap(() => console.log('fruit change')),
                    map(() => findNextFruitCell(this.Board)),
                    tap(cell => console.debug(cell)),
                )
                .subscribe(cell => {
                    if (!cell) {
                        this.win$.next();
                    } else {
                        this.Board.cells[cell.position.y][cell.position.x].type =
                            'fruit';
                        this.board$.next({ ...this.Board });
                    }

                })
        );
    }

    private initGameWin() {
        this.subs.add(
            this.win$
                .pipe(
                    take(1),
                    tap(() => console.log('WIN!!!'))
                )
                .subscribe(() => {
                    this.stopped$.next();
                })
        );
    }

    private initGameOver() {
        this.subs.add(
            this.gameOver$
                .pipe(
                    take(1),
                    tap(() => console.log('game over'))
                )
                .subscribe(() => {
                    this.stopped$.next();
                })
        );
    }

    private initializeBoard(options: Options): Board {
        const board = buildDefaultBoard(options);
        this.snakeCells = setupSnakeCells(board, options);

        return board;
    }

    private processSnakeTick(board: Board) {
        const firstCell = this.snakeCells[0];
        const nextPosition = getNextHeadPosition(
            firstCell.position,
            this.direction
        );

        if (!validatePosition(nextPosition, this.options)) {
            this.gameOver$.next();
            return;
        }

        const nextCell = board.cells[nextPosition.y][nextPosition.x];

        switch (nextCell.type) {
            case 'fruit':
                this.moveSnakeForward(nextCell, this.snakeCells);
                this.score$.next(this.score$.value + 1);
                break;
            case 'default':
                this.moveSnakeForward(nextCell, this.snakeCells);
                this.removeSnakeTail(this.snakeCells);
                break;
            case 'snake':
                this.gameOver$.next();
                break;
        }
    }

    private moveSnakeForward(nextCell: Cell, snakeCells: Cell[]) {
        nextCell.type = 'snake';
        snakeCells.unshift(nextCell);
    }

    private removeSnakeTail(snakeCells: Cell[]) {
        const lastCell = snakeCells.pop();
        lastCell!.type = 'default';
    }

    // TODO: review
    private dispose() {
        if (this.subs && !this.subs.closed) {
            this.subs.unsubscribe();
        }

        this.disposeSubject(this.win$);
        this.disposeSubject(this.board$);
        this.disposeSubject(this.paused$);
        this.disposeSubject(this.stopped$);
        this.disposeSubject(this.score$);
        this.disposeSubject(this.inProgress$);
        this.disposeSubject(this.time$);
    }

    private disposeSubject(subj$: Subject<any>) {
        if (subj$ && !subj$.closed) {
            subj$.complete();
            subj$.unsubscribe();
        }
    }
}
