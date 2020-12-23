import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from 'src/app/services/youtube.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(private youtuveService: YoutubeService) { }

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos() {
    this.youtuveService.getVideos().subscribe(v => {
      console.log(v);
      this.videos.push(...v);
    });
  }

  mostrarVideo(video: Video) {
    Swal.fire({
      html: `
      <h4>${ video.title }</h4>
      <hr>
      <iframe 
        width="100%" 
        src="https://www.youtube.com/embed/${ video.resourceId.videoId }" 
        frameborder="0" 
        allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope; 
          picture-in-picture" 
        allowfullscreen>
      </iframe>`
    });
  }
}
