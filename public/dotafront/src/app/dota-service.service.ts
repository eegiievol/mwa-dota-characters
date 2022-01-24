import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HeroType } from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class DotaServiceService {

  #apiBaseUrl: string = 'http://localhost:8080/api/heroes';

  constructor(private http: HttpClient) { }

  public getAllHeroes(): Promise<HeroType[]> {
    console.log('get All Heroes called');
    const url: string = this.#apiBaseUrl;
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as HeroType[])
      .catch(this.handleError);
  }

  public getHeroe(heroid: string): Promise<HeroType[]> {
    console.log('get Heroe called');
    const url: string = this.#apiBaseUrl + heroid;
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as HeroType[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('Something went wrong', error);
    return Promise.reject(error.message || error);
  }
}
