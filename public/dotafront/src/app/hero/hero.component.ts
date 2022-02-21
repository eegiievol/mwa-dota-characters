import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DotaServiceService } from '../dota-service.service';
import { HeroType } from '../heroes/heroes.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  heroId!: string;
  hero!: HeroType;
  constructor(
    private route: ActivatedRoute,
    private gameService: DotaServiceService
  ) {
    this.hero = new HeroType('', '', '', false, '', []);
  }

  ngOnInit(): void {
    this.heroId = this.route.snapshot.params['id'];
    console.log("hero id: ", this.heroId);
    this.gameService
      .getHero(this.heroId)
      .then((response) => {
        this.hero = response;
      })
      .catch((error) => console.log('Error getting Hero:', error));
  }



}
