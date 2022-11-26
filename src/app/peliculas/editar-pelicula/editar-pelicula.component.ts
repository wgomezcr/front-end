import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor() { }

  modelo  : PeliculaDTO = {titulo : 'Spiderman', 'trailer': 'asd',enCines:true, resumen:'cosa',
  fechaLanzamiento: new Date(),poster:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2BzbKU8rLWTwlpXIQOioTsWQ_e6C5UAlRpQSftRtqG2_U77tstIeL&usqp=CAE&s' }

  ngOnInit(): void {
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
console.log(pelicula);
  }

}
