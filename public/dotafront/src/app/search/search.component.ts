import { Component, OnInit } from '@angular/core';
import { DotaServiceService } from '../dota-service.service';
import { HeroType } from '../heroes/heroes.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  heroName!: string;
  heroes: HeroType[] = [];
  constructor(private heroService: DotaServiceService) { }

  ngOnInit(): void {
  }
  
  searchHero(): void {
    this.heroService
      .searchByName(this.heroName)
      .then((response) => {
        this.heroes = response;
      })
      .catch((error) => this.errorHandler(error));
  }

  private errorHandler(error: any): void {
    console.log('Error Searching hero', error);
  }
}
