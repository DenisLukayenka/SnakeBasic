import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalType } from 'src/models/modal';
import { GameService } from 'src/services/game.service';
import { ModalService } from 'src/services/modal.service';

@Component({
    selector: 's-pause-modal',
    templateUrl: './pause.component.html',
    styleUrls: ['./pause.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PauseModalComponent {
    constructor(
        private modalService: ModalService,
        public gameService: GameService
    ) {}

    ngOnInit() {
        this.modalService.setActions([
            {
                caption: 'Resume',
                type: 'button',
                callback: () => this.resume(),
            },
        ]);
        this.modalService.setType(ModalType.Pause);
    }

    resume() {
        console.log('pause pressed');
        this.modalService.hide();
        this.gameService.resume();
    }
}
