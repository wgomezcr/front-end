import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { credencialesUsuario, respuestaAutenticacion, UsuarioDTO } from './seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient:HttpClient) { }

  apiURL = environment.apiURL + 'cuentas'

  //Llave que se definen para el local storage
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
 //Para extraer el rol del JWT
  private readonly campoRol = 'role';


obtenerUsuarios(pagina: number, recordPorPagina: number): Observable<any>{
let params = new HttpParams();
params = params.append('pagina',pagina.toString());
params = params.append('recordsPorPagina', recordPorPagina.toString());
return this.httpClient.get<UsuarioDTO[]>(`${this.apiURL}/listadoUsuarios`,
{observe: 'response', params})
}

hacerAdmin(usuarioId: string){
  const headers = new HttpHeaders('Content-Type: application/json');
  return this.httpClient.post(`${this.apiURL}/hacerAdmin`,JSON.stringify(usuarioId), {headers});
}

removerAdmin(usuarioId: string){
  const headers = new HttpHeaders('Content-Type: application/json');
  return this.httpClient.post(`${this.apiURL}/removerAdmin`,JSON.stringify(usuarioId), {headers});
}


  
  
  
  estaLogueado(): boolean{
    
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return false
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol():string{
    return this.obtenerCampoJWT(this.campoRol);
  }

  
  obtenerCampoJWT(campo: string): string{
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {return '';}
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  registrar(credenciales:credencialesUsuario):Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/crear',credenciales);
  }

  login(credenciales:credencialesUsuario):Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/login',credenciales);
  }

  //para guardar en localstorage
  guardarToken(respuestaAutenticacion:respuestaAutenticacion){
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }

  obtenerToken(){
    return localStorage.getItem(this.llaveToken);
  }

}
