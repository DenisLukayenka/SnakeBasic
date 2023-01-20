import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EmbeddedViewRef,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
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
        this.gameService.init({
            height: 20,
            width: 20,
            snakeSize: 3,
            speed: 300,
        });
        this.board$ = this.gameService.board$;

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
