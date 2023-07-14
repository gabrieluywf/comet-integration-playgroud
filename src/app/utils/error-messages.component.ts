import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Field } from '../interfaces/field.interface';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  template: `
    <ng-container *ngFor="let validation of fieldInfo.validations">
      <app-error-message [field]="field" [validation]="validation"></app-error-message>
    </ng-container>
  `,
  imports:[CommonModule, ErrorMessageComponent]
})
export class ErrorMessagesComponent {
  @Input() field!: AbstractControl;
  @Input() fieldInfo!: Field;
}