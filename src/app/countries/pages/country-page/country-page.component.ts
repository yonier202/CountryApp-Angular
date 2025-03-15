import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountriesService,
    private router: Router,
  ){}

  ngOnInit(): void {
      this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.countryService.searchCountryByAlphaCode(id))
      )
      .subscribe( (country) => {
        if(!country){
          return this.router.navigateByUrl('');
        }
        // return
        return this.country = country;
      })
  }

}
