import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas/pelicula';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  //inyecto pelicula service en el constructor
  constructor(private peliculasService: PeliculasService){}

  ngOnInit(): void {
    this.cargarDatos();
     
    } 
    
    cargarDatos(){
      this.peliculasService.obtenerLandingPage().subscribe(landingPage => {
        this.peliculasEnCines = landingPage.enCines;
        this.peliculasProximosEstrenos = landingPage.proximosEstrenos;
      });
    }

    borrado(){
      this.cargarDatos();
    }
    
    peliculasEnCines: PeliculaDTO[];
    peliculasProximosEstrenos: PeliculaDTO[];
    
   
    
    nuevapeli = [];
    

}
