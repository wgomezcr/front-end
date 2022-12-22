import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {
//activatedRoute para manipular el id de la pelicula
  constructor(private peliculaService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  modelo  : PeliculaDTO;
  generosNoSeleccionados: MultipleSelectorModel[];
  generosSeleccionados: MultipleSelectorModel[]; 
  cinesSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  actoresSeleccionados: actorPeliculaDTO[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculaService.putGet(params.id)
      .subscribe(peliculaPutGet => {
        this.modelo = peliculaPutGet.pelicula;

        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });

        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
  
        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cines => {
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });

        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cines => {
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });

        this.actoresSeleccionados = peliculaPutGet.actores;

      });
    })
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
//console.log(pelicula);
this.peliculaService.editar(this.modelo.id,pelicula)
.subscribe(() => this.router.navigate(['/pelicula/' + this.modelo.id]))
  }

}
