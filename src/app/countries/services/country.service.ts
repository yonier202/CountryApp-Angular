import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) { }

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

  searchCapital(termn: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${termn}`)
    .pipe(
      catchError(error => {
        console.error('Error in CountriesService:', error);
        //enviar al observable un arreglo vacio
        return of([]);
      })
    );
  }

  searCountry(termn: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/name/${termn}`)
    .pipe(
      catchError(error => {
        console.error('Error in CountriesService:', error);
        //enviar al observable un arreglo vacio
        return of([]);
      })
    );
  }

  searRegion(termn: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/region/${termn}`)
    .pipe(
      catchError(error => {
        console.error('Error in CountriesService:', error);
        //enviar al observable un arreglo vacio
        return of([]);
      })
    );
  }

}
