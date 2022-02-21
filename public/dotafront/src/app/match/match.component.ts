import { Component, OnInit } from '@angular/core';

export class Match {
  #_id!: string;
  #region!: string;
  #date!: Date;
  #matchmaking!: string;
  #winner!: string;

  get _id() {
    return this.#_id;
  }
  get region() {
    return this.#region;
  }
  get date() {
    return this.#date;
  }
  get matchmaking() {
    return this.#matchmaking;
  }
  get winner() {
    return this.#winner;
  }

  constructor(id: string, region: string, date: Date, matchmaking: string, winner: string) {
    this.#_id = id;
    this.#region = region;
    this.#date = date;
    this.#matchmaking = matchmaking;
    this.#winner = winner;
  }
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
})
export class MatchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
