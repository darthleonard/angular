import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private baseUrl = 'https://api.themoviedb.org/3'
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: 'ae4bdd350320b033985e1140f657accf',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera() : Observable<Movie[]> {
    if(this.cargando){
      return of([]);
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing?`, {
      params: this.params
    }).pipe(
      map(r => r.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto };
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map(r => r.results)
    );
  }
}
