import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { ModalService } from 'src/services/modal.service';

@Component({
    selector: 's-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
    @Input() headerTemplate!: TemplateRef<HTMLElement>;
    @Input() bodyTemplate!: TemplateRef<HTMLElement>;
    @Input() footerTemplate!: TemplateRef<HTMLElement>;

    constructor(public modalService: ModalService) {
        
    }
}