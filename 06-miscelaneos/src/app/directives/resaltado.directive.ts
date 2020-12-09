import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  @Input("appResaltado") nuevoColor: string;

  constructor(private elementRef: ElementRef) { 
    console.log('directiva llamada')
    
  }

  @HostListener('mouseenter') mouseEntro() {
    this.resaltar(this.nuevoColor);
  }

  @HostListener('mouseleave') mouseSalio() {
    this.resaltar(null);
  }

  private resaltar(color: string = 'yellow'){
    this.elementRef.nativeElement.style.backgroundColor = color;
  }

}
