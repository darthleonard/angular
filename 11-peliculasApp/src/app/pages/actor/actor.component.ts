import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorResponse } from 'src/app/interfaces/actor-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  actor: ActorResponse;

  constructor(private activatedRoute: ActivatedRoute, 
    private location: Location,
    private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.peliculasService.getActor(id).subscribe(actor => {
      this.actor = actor;
    });
  }

  onRegresar() {
    this.location.back();
  }
}
