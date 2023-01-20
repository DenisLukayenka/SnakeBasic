import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EmbeddedViewRef,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { Board } from 'src/models/board';
import { Cell } from 'src/models/cell';
import { GameService } from 'src/services/game.service';

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

    @ViewChild('gameOver', { read: TemplateRef })
    gameOverTemplate!: TemplateRef<HTMLElement>;

    @ViewChild('overlay', { read: TemplateRef })
    overlayTemplate!: TemplateRef<HTMLElement>;

    private modalView?: EmbeddedViewRef<HTMLElement>;
    private overlayView?: EmbeddedViewRef<HTMLElement>;

    constructor(
        public gameService: GameService,
        private viewContainer: ViewContainerRef,
        private cdr: ChangeDetectorRef
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
        this.modalView = this.viewContainer.createEmbeddedView(
            this.gameOverTemplate
        );
        this.showOverlay();
    }

    closeGameOver() {
        this.modalView?.destroy();
        this.closeOverlay();
    }

    trackBy(_: any, cell: Cell): string {
        return `${cell.position.x}_${cell.position.y}_${cell.type}`;
    }

    private showOverlay() {
        this.overlayView = this.viewContainer.createEmbeddedView(
            this.overlayTemplate
        );
    }

    private closeOverlay() {
        this.overlayView?.destroy();
    }
}
