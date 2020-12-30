import { Directive, EventEmitter, ElementRef, HostListener, Input, Output, Host } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  // validaciones
  private archivoPuedeSerargado(archivo: File): boolean {
    if(!this.archivoDropeado(archivo.name) && this.esImagen(archivo.type)) {
      return true;
    }
    return false;
  }

  private prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoDropeado(nombre: string): boolean {
    for(const archivo of this.archivos) {
      if(archivo.nombreArchivo == nombre) {
        console.log("el archivo " + nombre + " ya se agrego");
        return true;
      }
    }
    return false;
  }

  private esImagen(tipo: string): boolean {
    return (tipo === '' || tipo === undefined) 
      ? false 
      : tipo.startsWith('image');
  }
}
