import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'heroes-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCard, MatButton, MatFormField, MatInput],
  templateUrl: './heroes-form.component.html',
  styleUrl: './heroes-form.component.css',
})
export class HeroesFormComponent implements OnInit {
  heroesForm = new FormGroup({
    nombre: new FormControl({}, [Validators.required]),
    alias: new FormControl({}, [Validators.required]),
    descripcion: new FormControl({}, [Validators.required]),
    image_url: new FormControl({}, [Validators.required]),
    historia: new FormControl({}, [Validators.required]),
  });
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
