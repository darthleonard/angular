import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  marcadores : Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor() { 
    const nuevo = new Marcador(51.678418, 7.809007);
    this.marcadores.push(nuevo);
  }

  ngOnInit(): void {
  }

  agregarMarcador(event) {
    console.log(event);
    const coords: { lat: number, lng: number } = event.cords;
    const nuevo = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevo);
  }

}
