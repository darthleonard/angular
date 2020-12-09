import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-nuevo',
  template: `
    <p>
      usuario-nuevo works!
    </p>
  `
})
export class UsuarioNuevoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.parent.params.subscribe(p => {
      console.log('usuario nuevo')
      console.log(p)
    });
  }

  ngOnInit(): void {
  }

}
