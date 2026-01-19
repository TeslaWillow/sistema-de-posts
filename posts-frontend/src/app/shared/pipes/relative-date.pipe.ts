import { Pipe, PipeTransform } from '@angular/core';

const INTERVALS: { [key: string]: number } = {
  'año': 31536000,
  'mes': 2592000,
  'semana': 604800,
  'día': 86400,
  'hora': 3600,
  'minuto': 60
};

@Pipe({
  name: 'relativeDate',
  standalone: true
})
export class RelativeDatePipe implements PipeTransform {

  transform(value: string | Date | undefined): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Hace un momento';

    for (const [unit, secondsInUnit] of Object.entries(INTERVALS)) {
      const counter = Math.floor(seconds / secondsInUnit);
      if (counter > 0) {
        return `Hace ${counter} ${unit}${counter > 1 ? (unit === 'mes' ? 'es' : 's') : ''}`;
      }
    }

    return date.toLocaleDateString();
  }

}
