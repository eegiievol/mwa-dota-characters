import { Component, OnInit } from '@angular/core';
import { Match } from '../match/match.component';
import { DotaServiceService } from '../dota-service.service';

export class HeroType {
  #_id!: string;
  #name!: String;
  #type!: String;
  #range!: boolean;
  #role!: String;
  #matches!: Match[];

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
  set _id(id: string) {
    this.#_id=id;
  }
  set name(name: String) {
    this.#name=name;
  }
  set type(type: String) {
    this.#type = type;
  }
  set range(range: boolean) {
    this.#range = range;
  }
  set role(role: String) {
    this.#role = role;
  }

  get matches() {
    return this.#matches;
  }

  constructor(id: string, name: String, type: String, range: boolean, role: String, matches: Match[]) {
    this.#_id = id;
    this.#name = name;
    this.#type = type;
    this.#range = range;
    this.#role = role;
    this.#matches = matches;

  }
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  newHero: HeroType = new HeroType('', '', '', false, '', []);
  hero!: HeroType;
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

  private _getHeroes(): void {
    this.dotaServiceService
      .getAllHeroes()
      .then((response) => {
        this._setHeroes(response);
      })
      .catch((error) => this._errorHandler(error));
  }

  private _errorHandler(error: any): void {
    console.log('ERROR While getting Heroes. ', error);
  }

  onChangeObj(hero: any): void {
    this.hero = hero;
  }

  addHero(): void {
    this.dotaServiceService
      .addHero(this.newHero)
      .then(() => {
        this.newHero = new HeroType('', '', '', false, '', []);
        this._getHeroes();
      })
      .catch((error: any) => this._errorHandler(error));
  }

  deleteHero(): void {
    this.dotaServiceService
      .delete(this.hero)
      .then(() => this._getHeroes())
      .catch((error: any) => this._errorHandler(error));
  }


}
