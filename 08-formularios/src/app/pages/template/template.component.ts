import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: "Hector",
    apellido: "Gonzalez",
    correo: "a@b.co",
    pais: 'MEX',
    genero: 'M'
  }
  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(p => {
      this.paises = p;
      this.paises.unshift({nombre: 'seleccione pais', codigo: ''})
    });
  }

  guardar(forma: NgForm) {
    console.log(forma);
    if(forma.invalid) {
      Object.values(forma.controls).forEach(c => {
        c.markAsTouched();
      })
      return;
    }
  }

}
