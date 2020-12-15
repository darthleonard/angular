import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.creatFormulario();
    this.cargarDatos();
  }

  ngOnInit(): void {
  }

  campoNoValido(campo: string){
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get getPasatiempos() {
    console.log(this.forma.get('pasatiempos'));
    return this.forma.get('pasatiempos') as FormArray;
  }

  creatFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([], [], [])
    });
  }

  cargarDatos(){
    //this.forma.setValue({
    this.forma.reset({
      nombre: 'Hector',
      apellido: 'Gonzalez',
      correo: 'a@b.com',
      direccion: {
        distrito: 'queretaro',
        ciudad: 'corregidora'
      }
    });
  }

  guardar() {
    console.log(this.forma);
    if(this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(c => {
        if(c instanceof FormGroup) {
          Object.values(c.controls).forEach(s => s.markAsTouched());
        } else {
          c.markAsTouched();
        }
      });
    }
    //posteo de informacion
    this.forma.reset();
  }
}
