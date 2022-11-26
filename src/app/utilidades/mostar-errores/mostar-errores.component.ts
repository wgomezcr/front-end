import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostar-errores',
  templateUrl: './mostar-errores.component.html',
  styleUrls: ['./mostar-errores.component.css']
})
export class MostarErroresComponent implements OnInit {

@Input()
errores: string[]=[];  
  
  constructor() { }

  ngOnInit(): void {
  }

}
