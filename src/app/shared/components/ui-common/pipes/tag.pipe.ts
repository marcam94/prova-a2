import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag',
  standalone: true
})
export class TagPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
