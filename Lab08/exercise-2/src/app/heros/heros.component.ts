// src/app/heros/heros.component.ts
import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock.heros';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heroes = HEROES;
  selectedHero: any;

  constructor() { }

  ngOnInit(): void { }

  onSelect(hero: any): void {
    this.selectedHero = hero;
  }
}
