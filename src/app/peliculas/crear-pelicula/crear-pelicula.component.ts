import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaCreacionDTO } from '../pelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  ngOnInit(): void {}

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    console.log(pelicula);
  }
}
