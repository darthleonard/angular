import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: [
  ]
})
export class PaisesComponent implements OnInit {
  paises: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .subscribe((data: any) => {
        this.paises = data;
        console.log(data)
      });
  }

  ngOnInit(): void {
  }

}
