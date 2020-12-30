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
    this.prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this.getTransferencia(event);
    if(!transferencia) {
      return;
    }
    this.extraerArchivos(transferencia.files);
    this.prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  private getTransferencia(event: any) {
    return event.dataTransfer 
      ? event.dataTransfer 
      : event.originalEvent.dataTransfer;
  }

  private extraerArchivos(archivosLista: FileList) {
    for(const prop in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemp = archivosLista[prop];
      if(this.archivoPuedeSerargado(archivoTemp)) {
        const nuevo = new FileItem(archivoTemp);
        this.archivos.push(nuevo);
      }
    }
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
