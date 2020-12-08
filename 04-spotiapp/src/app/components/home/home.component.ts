import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  errorMsj: string;

  constructor(private spotifyService: SpotifyService) {
    this.error = false;
    this.loading = true;
    this.spotifyService.getNewReleases()
      .subscribe((data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, err => {
        this.error = true;
        this.loading = false;
        this.errorMsj = err.error.error.message;
      });
  }
  
}
