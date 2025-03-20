import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
      this.countries = this.countriesService.cacheStore.byCountries.countries;
      this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  public searchByCountry(term: string){
    this.isLoading = true;
    this.countriesService.searCountry(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }

}
