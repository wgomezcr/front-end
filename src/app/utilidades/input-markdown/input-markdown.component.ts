import { Component, EventEmitter,OnInit,Output } from '@angular/core';


@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  contenidoMarkdown='';

   @Output()
   change: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  inputTextArea(texto: string){
    this.contenidoMarkdown =  texto;
  }

}
