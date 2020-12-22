import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  marcadores : Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar) { 
    if(localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
    this.snackBar.open('construido', 'Cerrar', { duration: 3000 });
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
    this.snackBar.open('Marcador agregado', 'Cerrar');
  }

  borrarMarcador(i: number) {
    console.log(i);
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador eliminado', 'Cerrar');
  }

}
