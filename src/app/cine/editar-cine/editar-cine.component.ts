import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor() { }

  modelo: cineDTO = {nombre: "Sambill", latitud: 9.954883242306728, longitud:-444.0453457832337};

  ngOnInit(): void {
  }

  guardarCambios(cine: cineCreacionDTO){
    console.log(cine);
  }

}
