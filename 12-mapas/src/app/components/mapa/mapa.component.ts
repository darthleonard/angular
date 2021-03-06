import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  marcadores : Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) { 
    if(localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
    this.showSnackBar('construido');
  }

  ngOnInit(): void {
  }

  agregarMarcador(event) {
    console.log(event);
    const coords: { lat: number, lng: number } = event.cords;
    const nuevo = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevo);
    this.guardarStorage();
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
    this.showSnackBar('Marcador agregado');
  }

  borrarMarcador(i: number) {
    console.log(i);
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.showSnackBar('Marcador eliminado');
  }

  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(!result) {
        return;
      }
      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardarStorage();
      this.showSnackBar('Marcador actualizado');
    });
  }

  showSnackBar(msj: string) {
    this.snackBar.open(msj, 'Cerrar', { duration: 3000 });
  }

}
