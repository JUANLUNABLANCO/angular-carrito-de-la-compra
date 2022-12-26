import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = '#cc0000';
    this.element.nativeElement.style.color = '#fff';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
    this.element.nativeElement.style.color = '#000';
  }

  constructor(private element: ElementRef) {
    // element.nativeElement.style.backgroundColor = '#cc0000';
    // element.nativeElement.style.color = '#fff';
  }

}
