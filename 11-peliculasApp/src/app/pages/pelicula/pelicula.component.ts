import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  movie: MovieResponse;
  constructor(private activatedRoute: ActivatedRoute, 
    private peliculasService: PeliculasService,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.peliculasService.getPeliculaDetalle(id).subscribe(movie => {
      this.movie = movie;
    });
  }

  onRegresar() {
    this.location.back();
  }
}
