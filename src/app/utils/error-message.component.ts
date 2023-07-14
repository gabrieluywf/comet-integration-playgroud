import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validation } from '../interfaces/validation.interface';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: `
    <small *ngIf="hasError">
      {{ errorMessage }}
    </small>
  `,
  imports:[CommonModule]
})
export class ErrorMessageComponent {
  @Input() field!: AbstractControl;
  @Input() validation!: Validation;

  get hasError(): boolean {
    const result = this.field.hasError(this.mapErrorKey(this.validation.type)) && this.field.touched;
    return result;
  }

  get errorMessage(): string {
    return this.validation.type;
  }

  mapErrorKey(validationType: string): string {
    const mapping: { [key: string]: string } = {
      'NotEmpty': 'required',
      'Min': 'min',
      'Max': 'max',
      'Pattern': 'pattern',
    };

    return mapping[validationType];
  }
}