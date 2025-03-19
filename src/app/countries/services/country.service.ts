import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }
  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }
  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( error =>{
          console.error('Error in CountriesService:', error);
          return of([]);
        }),
        //espera 2 segundos
        delay(1000)
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(error => {
        console.error('Error in CountriesService:', error);
        //enviar al observable un null
        return of(null);
      })
    );
  }

  searchCapital(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        //tap (ejecutar un efecto secundario(guardar en el local storage))
        tap( countries => this.cacheStore.byCapital = {term: term, countries: countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

  searCountry(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        //tap (ejecutar un efecto secundario(guardar en el local storage))
        tap( countries => this.cacheStore.byCountries = {term: term, countries: countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

  searRegion(term: Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        //tap (ejecutar un efecto secundario(guardar en el local storage))
        tap( countries => this.cacheStore.byRegion = {region: term, countries: countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

}
