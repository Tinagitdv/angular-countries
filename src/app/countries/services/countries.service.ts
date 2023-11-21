import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${ code }`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null) )
      );
  }

  public searchCapital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/capital/${ term }`)
      .pipe(
        catchError( () => of([]) )

        /*{
          console.log(error);
          return of([]);
        })*/

        /*tap( countries => console.log('Pasó por el tap', countries) ),
        map( countries => [] ),
        tap( countries => console.log('Después del map', countries) )*/
      );
  }

  public searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/name/${ term }`)
      .pipe(
        catchError( () => of([]) )
      );
  }

  public searchRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/region/${ region }`)
      .pipe(
        catchError( () => of([]) )
      );
  }
}
