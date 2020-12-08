import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token: string;

  constructor(private http: HttpClient) { }

  getToken() {
    const client_id = 'f1572858c2884a98b301f17b32138d98';
    const client_secret = '5079e37a067246b7afbca5ba34f6280d';
    const url = `https://dl-spotify-get-token.herokuapp.com/spotify/${client_id}/${client_secret}`;
    this.http.get(url).subscribe(t => {
      this.token = t['access_token'];
    }, err => console.error("NO TOKEN GENERATED: " + err));
  }

  getQuery(query: string) {
    console.log('current token: ' + this.token);
    const url = `https://api.spotify.com/v1/${query}`;
    const aux = `Bearer BQBPDbc0KIUTxKHScJuaNaO955DbOIBOlDBO6rBMDwdk-24wKyIBHy9YRMgOTBLBoE8KprfcfWe_ylQsPr4`;
    const headers = new HttpHeaders({
      Authorization: aux
    });
    return this.http.get(url, {headers});
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=25`)
      .pipe(map(data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?market=es`)
      .pipe(map(data => data['tracks']));
  }
}
