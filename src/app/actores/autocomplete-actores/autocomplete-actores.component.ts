import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  control: FormControl = new FormControl();
  actores = [
    {nombre: 'Tom Holand',personaje:'', foto:'data:image/jpeg;base64,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'},
    {nombre: 'Tom Hanks', personaje:'', foto:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAcAAACAwADAQAAAAAAAAAAAAAFBgMEBwABAgj/xAA4EAACAQMCBAMFBwIHAQAAAAABAgMABBEFIQYSMUETUWEUIoGR8AcyQlJxsdGhwRUjU3Ki4fEl/8QAGQEAAwEBAQAAAAAAAAAAAAAAAgMEBQEA/8QAIhEAAgICAgICAwAAAAAAAAAAAQIAAxEhEjEEQTJCEyJR/9oADAMBAAIRAxEAPwBE4Y132LV+e6LKGO1bLpeuWt3Epj97bqaw/iK2S2veWHcqetHeHtRkSFVZ36dKRahOxKqLABgzYri9hurmDT1jjcviRsnbAO37UW04QrO8wVc/hOO1JOhuySxy82PGiGebOTufP+1McU/JjGcYxtU/xjAvImH5bkucHpUTQwyffRW/UUKFwQdycGvZvhy9enlXS49wxSfUuppdi5Ikt4yD6VPPpdiqDkhQY6bUL9uGBynepRqHNsx2ofyJjGJ002ZzmAOIdFWO9ivLMeGx9xwuwPkavcK654PD08Ugcy20zxjxHyc5zj4ZxVrUJg8fY4GaVJI0K3jEHw2u1cY2zlcHPyFElnGDZVy7haa1t7tmnlSCa5PVnxharHTrJt5Rp4buOUVU06/uruRoNK0cPEpw8sjYzXU3Cmr3UhlKxx5/CD0qkeS5GAMCRnxlB2ZkdxzXVy0nXJ70b4fiLTqvU52U96hs7JUj5mFM/DMckMkk9sximQAK69Vyf+sfGuWWcATDqqNjBR7jpFAY4Y5XjAbwkVRncfWa9F3Uhdx61HPFKLf2wnEzModcHDAdSPLqK41/AjyPNHLDHGB/mzDKtkbcuM57/KpGBY5EtrK16MIREKoZyMjzqZkt5ACHC5pXn4i0wSYW/iUn/WikIPyGB8TVf/FpyylRE/ic3hNDIHRu3UbZ33HahYMB1HKVY94jfFbQlEZpOq83wqGQwAkxt0pbutRuY5TawRvJJgKoG3N6VdtLmaR1S5sxBIPvf5nU/tS+LMNCMLKh/ZpeknLKwHlQSOF54rgKxUzTKgGPj/ajjwuTzNGwJHcYzUMNxCrQwzZjd5lCAJuMdc+W+RRJkA8ou3DEcY0aXaJYWaQwqNhufM1a5moDqXE8Fk/hxwytjYsq5Fd22vR3EIkGd/MVQHAEkFTMeplEcObdSaL6BmG6x+Fxg58+1RJbFIQh7VesYjGykdRuKresMCJHVaUYN/IzhZH0txlsK4KkjqD9f0pf1y2NxaLDIJCjHOEYjf4fH503WkXj2hI6sMqB223odqU0NqGjPI4U7g9KzyCMTUVgxIEy++0CGRyqWGM/i8UmmDg/QZre8AUkZ5T+blIzvv8ArUt/qcazckUSM5OygnA9TvTdo72lvErG4SQ8uWIwBmuBifcYU4jqKXGlvcePIDK7PIQrSLhGK4+7kdj388UlW+lxi4GGuLdvyRrkftWscRR2t3CbmN0JQZZSd2/T1oDaR2YcSF2/Xl3FDzI9whUG3iScMxTw2ptrhluIwwx1Xfft9Zo7dqlxqFpaQqeeOReZh26n6/Wvem28dxKvs6lVVsknrmuxd29txDbhvdluC5VT1PL1b9hXGJZcTy4Vs+wJBrHDV+14Xt72cRsc8oUY+dE9O0j2e2CStl85JqfUOIoreMnqegFQRcW2MacrBiR1yKcCme5Pwu49RXnh9/YVatIg22KlkjDHIFdxDkOa05jiMGkIsVq2dmLbetAtZtfaFLKcMTnI6UZs2zaOVzz9tqGTBWj5SRu2B2G/YVHauZf4z43EzTrqztLuQSJncjndwM/OquonF0ZdLyPEyX5SCD5UZ1DR4Jry69ptQYWcFAVwdvxKa6ks9LW3EfN4nKOry5PT1yR2pGBiXAEnIgfSEaVzNdznI2HOf6Yq54LvMWtXDxk5wDuOn81AdGsrmZ2FxKmB7scMuAf1xRvh3SjZmV5yxV2AQnuMdvrtQEAxhLIcmMPDUXhWMztkNgEknOd/4pWNyZeOrKS5bJaJ41PbOP8A2nOJlhtJi4JQjp3x0rN+Jy1tqNjdQffil5x6iiIxgSUuSxMYtRtpIbgzSc0kSb8o6mrUNpfX8SXMNjCsbjKhjvj1q5pl3FqMKyoQwYf1qSQTxuVRHCj8ucUFYAzmUvYzdShDLyPh+lGdP083oLqVSMdXbpQsXmiQwzTalcyYQ+6sS/eHnv2oHqnGXjQ//Pia0tFXljycs/rWozHGphqg+0bvbo21mPRrCQTSrDJNOVGAAq7KPUsVoZBcrLcxugzG2G3/AA+dLX2XX5bjh/EOTJYzde55kP8AamTWrRtH1PnRcabctkMBtG3kfr9qWykDMdWwYkQ3LbRTQswXnfvynr6ULm0SDxjzRjfdjt8sn41Qh1yBOaMTK2M/j61yfXFmixG+WLAk9SfMfKkOB3Kayw0YTsuG4VZZV90Hoh8/oUQuoo0iVYIwvNg4IwRgbg/Xeg1nrZiCRpluUd6tx3cl9dxRJ7035QenmT5ChAAhNyJ31KnEOrewwxQrEJncczAtykDt2/WkTWdSiv8ACyxtbydB4mMH49KZPtVtl07WdElXfx7WSJ28yjAg/wDM0pTck0ZBxv0zvT/wqdnuRm9s66ljQ7u+0rUVWMN4DjODuAaeU4tiCgOuG75rLxNcWLc1qx5FPvQk5A9VPlRJNVV1DMgJ9aBqD9THVeUo+Yg26vjeyKjOfDByRnr6mq93etKcbBF2VaFB2BOD2rhY+dVyKNH2e3fgca6e3aQPH81P8VtNxEJYXjkAdHGGRhkEV8/8LyNHxNpTKcH2uMfM4P719DsMY/Sug6nutzO9d4QGWk04jHXwJO3+0/zSu1vNayNE8U0T91BxmthnRTnIpT44m9i0yFo4onMs4Q+IvNgYJ2+VS20e11NCrysaYZivpcWoXlytvbM4bvl88o8zWrcN6RDpNrsS8z4Ludy5pK4AvH/xSC08OLwrgOzYTBBA7H+c1qNvGuRt0rlVeDkwPIv5aXQmU/bm80dzw9Kdo1eVfieX+wpLSTnHqK0j7fYUPD2mzEe+l8oB9CjVllvIy9D0FUSOWSecH8wqq78rYO3pUj7l/nVcSs5YsASDjpXp6f/Z'},
    {nombre: 'Samuel L. Jackson', personaje:'', foto:'data:image/jpeg;base64,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'},
  ]

  actoresOriginal = this.actores;

  actoresSeleccionados = [];

  columnasAMostrar = ['imagen','nombre', 'personaje','acciones'];

  @ViewChild(MatTable) table : MatTable<any>;

  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor=> actor.nombre.indexOf(valor) !== -1);
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice,1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data
    )
    moveItemInArray(this.actoresSeleccionados,indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

}
