import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  ngOnInit(): void {
      this.peliculasEnCines = [{
        titulo: 'Spiderx21212',
        fechaLanzamiento: new Date(),
        precio:1500.99,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2BzbKU8rLWTwlpXIQOioTsWQ_e6C5UAlRpQSftRtqG2_U77tstIeL&usqp=CAE&s'
        },
        {
          titulo: 'Moana23',
          fechaLanzamiento: new Date('2021-1-1'),
          precio:2000.99,
          poster:'data:image/jpeg;base64,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'
          }];
    }   
    peliculasEnCines;
    peliculasProximosEstrenos = [{
      titulo: 'AvengerEndGame',
      fechaLanzamiento: new Date(),
      precio:1500.99
      },
      {
        titulo: 'Inception',
        fechaLanzamiento: new Date('2021-1-1'),
        precio:2000.99
        },
        {
          titulo: 'Rocky',
          fechaLanzamiento: new Date('2021-1-1'),
          precio:2000.99
          }
      ];
    
    nuevapeli = [];
    

}
