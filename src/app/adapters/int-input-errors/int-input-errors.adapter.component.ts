import { ChangeDetectionStrategy, Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Field } from '../../interfaces/field.interface';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from 'src/app/utils/error-messages.component';

@Component({
  selector: 'int-input-errors-adapter',
  standalone: true,
  template: `
      <div [formGroup]="formGroup">
      <vaadin-integer-field
        [required]="isRequired"
        [invalid]="actialField.errors && actialField.touched"
        [attr.step-buttons-visible]="true"
        (value-changed)="onValueChanged($event)"
        [formControlName]="fieldInfo.id"
        [label]="fieldInfo.caption"
        min="0"
        max="10"
        ngDefaultControl
    >
    </vaadin-integer-field>
    <app-error-messages [field]="actialField" [fieldInfo]="fieldInfo"></app-error-messages>
  </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // changeDetection: ChangeDetectionStrategy.OnPush, comented in order to make the validation work would be good in terms of preformance to include it again
  imports:[CommonModule, ReactiveFormsModule, ErrorMessagesComponent]
})

// In this component we should set the min and max using the validations too
export class IntInputErrorsAdapterComponent implements OnInit {

    @Input() public fieldInfo!: Field;
    @Input() public formGroup!: UntypedFormGroup;
    public isRequired!: boolean;
    public actialField: AbstractControl = {} as AbstractControl;

    public ngOnInit(): void {
      // this is for translate the NoEmpty validation into required
      this.isRequired = this.fieldInfo.validations.some((v: { type: string }) => v.type === 'NotEmpty');
      this.actialField = this.formGroup.controls[this.fieldInfo.id];
    }
    // we have to listen for the value change and update the form, it can come by parameter or we could also point to the store.   
    onValueChanged(data: any) {
      this.formGroup.patchValue({
        [this.fieldInfo.id]: data.detail.value
      });
  }
}