import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalType } from 'src/models/modal';
import { GameService } from 'src/services/game.service';
import { ModalService } from 'src/services/modal.service';

@Component({
    selector: 's-win-modal',
    templateUrl: './win.component.html',
    styleUrls: ['./win.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinModalComponent {
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
        this.modalService.setType(ModalType.Win);
    }

    tryAgain() {
        console.log('Won and try again!!!');
        this.modalService.hide();
        this.gameService.reset();
    }
}