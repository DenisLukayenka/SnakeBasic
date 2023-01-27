import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time',
})
export class TimePipe implements PipeTransform {
    transform(value: number | null) {
        value = value || 0;

        const minutes = Math.trunc(value / 60);
        const seconds = value - (minutes * 60);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}