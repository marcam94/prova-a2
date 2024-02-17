import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialogActions } from '@angular/material/dialog';
import { DialogService } from '../../../shared/components/ui-common/dialog/dialog.service';
import { Store } from '@ngxs/store';
import { HeroesService } from '../../../core/domain/infrastructure/mocks/heroes/heroes.service';
import { Heroes } from '../../../core/domain/entity/heroes';

@Component({
  selector: 'heroes-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogActions,
  ],
  templateUrl: './heroes-form.component.html',
  styleUrl: './heroes-form.component.css',
})
export class HeroesFormComponent implements OnInit {
  private readonly dialogService = inject(DialogService);
  private readonly store = inject(Store);
  private readonly heroesService = inject(HeroesService);
  heroesForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    alias: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    imagen_url: new FormControl('', [Validators.required]),
    historia: new FormControl('', [Validators.required]),
  });
  constructor() {}
  //IMAGEWN https://medium.com/@chemakhi.imad/angula-material-image-input-0daf3ea370f0
  ngOnInit(): void {
    //VIENE ID Y SE MONTA FORMULARIO.
  }

  submitForm() {
    if (this.heroesForm.valid) {
      const hero = {
        id: undefined,
        ...this.heroesForm.getRawValue(),
      } as Heroes;
      console.log(hero);
      this.heroesService.post(hero).subscribe(data => {
        console.log(data);
        //save data then go back.
      });
    }
  }

  closeDialog() {
    this.dialogService.closeDialog();
  }
}
