import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalType } from 'src/models/modal';
import { GameService } from 'src/services/game.service';
import { ModalService } from 'src/services/modal.service';

@Component({
    selector: 's-gameover-modal',
    templateUrl: './gameover.component.html',
    styleUrls: ['./gameover.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverModalComponent {
    constructor(
        private modalService: ModalService,
        public gameService: GameService
    ) {}

    ngOnInit() {
        this.modalService.setActions([
            {
                caption: 'Try again',
                type: 'button',
                callback: () => this.tryAgain(),
            },
        ]);
        this.modalService.setType(ModalType.GameOver);
    }

    tryAgain() {
        console.log('try again!!!');
        this.gameService.reset();
        this.modalService.hide();
    }
}
