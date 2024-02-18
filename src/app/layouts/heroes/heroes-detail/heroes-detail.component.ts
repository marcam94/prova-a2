import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from '../../../core/domain/entity/heroes';

@Component({
  selector: 'app-heroes-detail',
  standalone: true,
  imports: [],
  templateUrl: './heroes-detail.component.html',
  styleUrl: './heroes-detail.component.css',
})
export class HeroesDetailComponent implements OnInit{
  @Input() heroId!: number | string;
    ngOnInit(): void {
      console.log(this);
    }

}
