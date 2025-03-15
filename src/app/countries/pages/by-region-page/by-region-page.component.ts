import { Component } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor( private countryService: CountriesService){}

  public searchByRegion(term: string): void{
    this.countryService.searRegion(term)
     .subscribe(countries => {
        this.countries = countries;
      })
  }
}
