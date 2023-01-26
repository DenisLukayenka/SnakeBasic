import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { Board } from 'src/models/board';
import { Cell } from 'src/models/cell';
import { GameService } from 'src/services/game.service';
import { ModalService } from 'src/services/modal.service';

@Component({
    selector: 's-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
    board$!: Observable<Board>;
    paused$!: Observable<boolean>;
    gameInProgress$!: Observable<boolean>;

    constructor(
        public gameService: GameService,
        private cdr: ChangeDetectorRef,
        private modalService: ModalService,
    ) {}

    ngOnInit() {
        this.board$ = this.gameService.board$;
        this.paused$ = this.gameService.paused$.pipe(startWith(false));
        this.gameInProgress$ = this.gameService.inProgress$;

        this.gameService.gameOver$.subscribe(() => this.showGameOver());
    }

    gameStart() {
        this.gameService.start();
    }

    gamePause() {
        this.gameService.pause();
    }

    gameResume() {
        this.gameService.resume();
    }

    gameStop() {
        this.gameService.stop();
    }

    gameTryAgain() {
        this.closeGameOver();

        this.gameService.reset();

        this.cdr.detectChanges();
    }

    showGameOver() {
        this.modalService.show();
    }

    closeGameOver() {
        this.modalService.hide();
    }

    trackBy(_: any, cell: Cell): string {
        return `${cell.position.x}_${cell.position.y}_${cell.type}`;
    }
}
