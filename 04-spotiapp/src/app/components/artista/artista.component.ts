import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {
  artista: any = {};
  tracks: any[] = [];
  loading: boolean;

  constructor(private activatedRoute: ActivatedRoute, private spotyfy: SpotifyService) {
    this.activatedRoute.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotyfy.getArtista(id)
      .subscribe(artista => {
        this.artista = artista;
        this.loading = false;
      });
  }

  getTopTracks(id: string) {
    this.spotyfy.getTopTracks(id)
      .subscribe(tracks => {
        this.tracks = tracks;
        console.log(this.tracks);
      });
  }
}
