
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CellType } from 'src/models/cell';

@Component({
    selector: 's-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
    @Input() type!: CellType;
}