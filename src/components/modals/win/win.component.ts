import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 's-win-modal',
    templateUrl: './win.component.html',
    styleUrls: ['./win.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinModalComponent {
    
}