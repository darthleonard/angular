import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme: boolean = false;
  
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // Swal.fire({
    //   allowOutsideClick: false,
    //   icon: 'info',
    //   text: 'espere'
    // });
    // Swal.showLoading();
    this.auth.login(this.usuario)
      .subscribe(r => {
        console.log(r);
        //switchAll.close();
        if(this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      }, err => {
        console.log(err.error.error.message);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error al autenticar'
        //   text: err.error.error.message
        // });
      });
  }
}
