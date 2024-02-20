import {Component, Input} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-errors-form-wrapper',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './errors-form.component.html',
  styleUrl: './errors-form.component.scss',
})
/**
 * Componente reutilizable para controlar los errores de los formularios (ReactiveForm)
 * En caso de que queramos controlar más errores se añaden al objeto dinamico erroresForm.
 */
export class ErrorsFormComponent {
  @Input({required: true}) errors!: ValidationErrors | any;

  erroresForm: { [key: string]: string | unknown } = {
    required: 'Campo requerido',
    maxlength: (value: any) =>
      `Supera la longitud máxima, ${value.requiredLength}`,
    minlength: (value: any) =>
      `La longitud debe ser de al menos, ${value.requiredLength}`,
    email: 'Email requerido o no valido',
    pattern: 'URL incorrecta'
  };

  getError(error: { key: string | unknown; value: any }) {
    const errorMessage = this.erroresForm[error.key as string];
    if (errorMessage && typeof errorMessage === 'function') {
      return errorMessage(error.value) as string;
    }
    return errorMessage;
  }
}
