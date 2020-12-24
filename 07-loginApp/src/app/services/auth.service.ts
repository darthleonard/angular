import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBE-4U6zSwF9V3gCc9SKZiu45HG_irXYGo';
  private userToken: string;

    // crear nuevo usuario
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

    // login
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() { 

  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map(r => {
        this.guardarToken(r['idToken']);
        return r;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {
      const authData = {
        ...usuario,
        returnSecureToken: true
      };
      return this.http.post(
        `${ this.url }signUp?key=${ this.apikey }`,
        authData
      ).pipe(
        map(r => {
          this.guardarToken(r['idToken']);
          return r;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}
