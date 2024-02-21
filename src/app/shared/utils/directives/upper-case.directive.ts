import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[upperCase]',
})
export class UpperCaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: {
    stopPropagation: () => void;
  }) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.toUpperCase();

    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
