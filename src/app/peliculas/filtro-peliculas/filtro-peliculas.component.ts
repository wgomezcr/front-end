import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css'],
})
export class FiltroPeliculasComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute) {}

  form: FormGroup;

  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Accion' },
    { id: 3, nombre: 'Comedia' },
  ];

  peliculas = [
    {
      titulo: 'Spiderman-Man Far From Home',
      enCines: false,
      proximosEstrenos: true,
      generos: [1, 2],
      poster:
        'data:image/jpeg;base64,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',
    },
    {
      titulo: 'Moana',
      enCines: true,
      proximosEstrenos: false,
      generos: [3],
      poster:
        'data:image/jpeg;base64,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',
    },
    {
      titulo: 'Inception',
      enCines: false,
      proximosEstrenos: false,
      generos: [1, 3],
      poster:
        'data:image/jpeg;base64,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',
    },
  ];

  peliculasOriginal = this.peliculas;

  formulaOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formulaOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges.subscribe((valores) => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnURL();
    });
  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params) => {
      var objeto: any = {};

      if(params.titulo){
        objeto.titulo = params.titulo;
      }

      if(params.generoId){
        objeto.generoId = Number (params.generoId);
      }

      if(params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if(params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);

    });
  }

  private escribirParametrosBusquedaEnURL(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if (valoresFormulario.generoId != 0) {
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if (valoresFormulario.proximosEstrenos) {
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if (valoresFormulario.enCines) {
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  buscarPeliculas(valores: any) {
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.titulo.indexOf(valores.titulo) !== -1
      );
    }

    if (valores.generoId !== 0) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.generos.indexOf(valores.generoId) !== -1
      );
    }

    if (valores.proximosEstrenos) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.proximosEstrenos
      );
    }

    if (valores.enCines) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.enCines
      );
    }

    
   

  }

  limpiar() {
    this.form.patchValue(this.formulaOriginal);
  }
}
