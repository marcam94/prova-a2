import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/components";
import {

} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {HeroesComponent} from "../heroes/heroes.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    MatButton,
    HeroesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
