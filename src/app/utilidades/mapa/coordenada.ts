export interface Coordenada{
    latitud: number;
    longitud: number;
}

//Se extiende la clase coordenada para mostrar en el mensaje un nombre
export interface CoordenadaConMensaje extends Coordenada{
    mensaje:string;
}