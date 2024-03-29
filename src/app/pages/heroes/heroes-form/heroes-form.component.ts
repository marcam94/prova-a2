import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialogActions } from '@angular/material/dialog';
import { MatOption, MatSelect } from '@angular/material/select';
import { ErrorsFormComponent } from '../../../shared';
import { DialogService } from '../../../shared/ui-common/dialog/dialog.service';

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
    MatSelect,
    MatOption,
    ErrorsFormComponent,
    MatError,
  ],
  templateUrl: './heroes-form.component.html',
  styleUrl: './heroes-form.component.css',
})
export class HeroesFormComponent implements OnInit {
  @Output() outputData = new EventEmitter();
  @Input() inputData!: [{ name: string; value: any }];
  heroesForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    alias: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    imagen_url: new FormControl('', [
      Validators.pattern(/\.(jpg|jpeg|png|webp)$/i),
      Validators.required,
    ]),
    historia: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
  });
  private readonly dialogService = inject(DialogService);

  constructor() {}

  ngOnInit(): void {
    if (this.inputData) {
      this.setFormValues(this.inputData);
    }
  }

  submitForm() {
    if (this.heroesForm.valid) {
      this.outputData.emit(this.heroesForm.getRawValue() as any);
    }
  }

  closeDialog() {
    this.dialogService.closeDialog();
  }

  private setFormValues(inputData: [{ name: string; value: any }]) {
    let inputDataObject: { [key: string]: any } = {};
    for (const item of inputData) {
      inputDataObject = { ...item.value };
    }
    this.heroesForm.patchValue({ ...inputDataObject });
  }
}
