import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadInterceptorService implements HttpInterceptor {

  constructor(private seguridadService: SeguridadService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.seguridadService.obtenerToken();
    if (token) {
      //req es la peticion http a la que estamos accesando
      //aqui estamos clonando la peticion para agregar el token al header
      req = req.clone({
        //setHeader permite agregar cabeceras a la peticion http
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }
    //asi se indica para regresar el nuevo objeto req con la cabecera que se define
    return next.handle(req);
  }
}
