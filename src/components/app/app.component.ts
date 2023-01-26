import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalType } from 'src/models/modal';
import { ModalService } from 'src/services/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'snake';

    ModalTypeLocale = ModalType;

    constructor(public modalService: ModalService) {}
}
