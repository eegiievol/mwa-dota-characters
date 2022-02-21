import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HeroType } from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class DotaServiceService {

  #apiBaseUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public getAllHeroes(): Promise<HeroType[]> {
    console.log('get All Heroes called');
    const url: string = this.#apiBaseUrl + "/heroes";
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as HeroType[])
      .catch(this.handleError);
  }

  public getHero(heroid: string): Promise<HeroType> {
    console.log('get Heroe called');
    const url: string = this.#apiBaseUrl + "/heroes/" + heroid;
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as HeroType)
      .catch(this.handleError);
  }

  addHero(newHero: HeroType): Promise<HeroType> {
    const url: string = this.#apiBaseUrl + '/heroes/';
    return this.http
      .post(url, {
        name: newHero.name,
        type: newHero.type,
        range: newHero.range,
        role: newHero.role
      })
      .toPromise()
      .then((response: any) => response as HeroType[])
      .catch(this.handleError);
  }

  delete(hero: HeroType): Promise<HeroType> {
    const url: string = this.#apiBaseUrl + '/heroes/' + hero._id;
    return this.http
      .delete(url)
      .toPromise()
      .then((response: any) => response as HeroType[])
      .catch(this.handleError);
  }

  searchByName(name: string): Promise<HeroType[]> {
    const url: string = this.#apiBaseUrl + '/heroes?name=' + name;
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as HeroType)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('Something went wrong', error);
    return Promise.reject(error.message || error);
  }
}
