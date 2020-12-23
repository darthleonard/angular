import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyAT9dLEOP2bbHLaWcx-nbeF51_8DnzzJkw';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private http: HttpClient) {
    
  }

  getVideos() {
    const url = `${ this.youtubeUrl }/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playList)
      .set('key', this.apiKey);
    return this.http.get(url, { params });
  }
}
