import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];

  //Region es un molde de lo que debe llevar el arreglo
  public regions: Region[] = ['Africa', 'Europe', 'Americas', 'Asia', 'Oceania'];
  public selectedRegion?: Region;

  constructor( private countryService: CountriesService){}

  ngOnInit(): void {
      this.selectedRegion = this.countryService.cacheStore.byRegion.region;
      this.countries = this.countryService.cacheStore.byRegion.countries;
  }

  public searchByRegion(term: Region): void{
    this.selectedRegion = term;
    this.countryService.searRegion(term)
     .subscribe(countries => {
        this.countries = countries;
      })
  }
}
