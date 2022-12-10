import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { PeliculaCreacionDTO, PeliculaPostGet } from './pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }
  private apiURL = environment.apiURL + 'peliculas';

  public postGet(): Observable<PeliculaPostGet>{
    return this.http.get<PeliculaPostGet>(`${this.apiURL}/postGet`);
  }

  public crear(pelicula: PeliculaCreacionDTO){
    const formData = this.ConstruirFormData(pelicula);
    return this.http.post(this.apiURL, formData);
  }

  //Esto sirve para enviar todos los campos que se utilizaran en la creacion
  private ConstruirFormData(pelicula: PeliculaCreacionDTO): FormData{
    const formData = new FormData();

    formData.append('titulo',pelicula.titulo);
    formData.append('resumen',pelicula.resumen);
    formData.append('trailer',pelicula.trailer);
    formData.append('enCines',String(pelicula.enCines));
    if (pelicula.fechaLanzamiento) {
      formData.append('fechaLanzamiento',formatearFecha(pelicula.fechaLanzamiento));
    }
    if (pelicula.poster) {
      formData.append('poster',pelicula.poster);
    }

    formData.append('generosIds',JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds',JSON.stringify(pelicula.cinesIds));
    formData.append('actores',JSON.stringify(pelicula.actores));

    return formData;
  }



}
