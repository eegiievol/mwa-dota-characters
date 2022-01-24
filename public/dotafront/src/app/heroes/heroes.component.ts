import { Component, OnInit } from '@angular/core';
import { DotaServiceService } from '../dota-service.service';

export class HeroType {
  #_id!: string;
  #name!: String;
  #type!: String;
  #range!: boolean;
  #role!: String;

  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#name;
  }
  get type() {
    return this.#type;
  }
  get range() {
    return this.#range;
  }
  get role() {
    return this.#role;
  }

  constructor(name: String, type: String, range: boolean, role: String) {
    this.#name = name;
    this.#type = type;
    this.#range = range;
    this.#role = role;
  }
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroType[] = [];
  constructor(private dotaServiceService: DotaServiceService) { }

  ngOnInit(): void {
    this.dotaServiceService
      .getAllHeroes()
      .then((response) => this._setHeroes(response))
      .catch((error) => this._errorHandler(error));
  }

  private _setHeroes(heroes: HeroType[]): void {
    this.heroes = heroes;
  }

  private _errorHandler(error: any): void {
    console.log('ERROR While getting Heroes. ', error);
  }

}
