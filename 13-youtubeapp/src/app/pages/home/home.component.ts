import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(private youtuveService: YoutubeService) { }

  ngOnInit(): void {
    this.youtuveService.getVideos().subscribe(v => {
      console.log(v);
      this.videos.push(...v);
    });
  }

}
