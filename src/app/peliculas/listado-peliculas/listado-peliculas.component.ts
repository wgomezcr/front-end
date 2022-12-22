import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor(private peliculasService:PeliculasService) { }
  @Input()
  peliculas: PeliculaDTO[];

  //Avisa al componente padre que se ha eliminado una pelicula
  @Output()
  borrado: EventEmitter<void> = new EventEmitter<void>();


  ngOnInit(): void {
  
  }

borrar(peliculaId:number):void{
  this.peliculasService.borrar(peliculaId)
  //Esta linea avisa al componente padre del borrado
  .subscribe(() => this.borrado.emit());
}


}
