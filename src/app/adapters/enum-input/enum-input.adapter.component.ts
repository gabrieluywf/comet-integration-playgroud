import { ChangeDetectionStrategy, Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Field } from '../../interfaces/field.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'enum-input-adapter',
  standalone: true,
  template: `
    <div [formGroup]="formGroup">
    <vaadin-radio-group
        [required]="isRequired"
        [invalid]="actialField.errors && actialField.touched"
        [formControlName]="fieldInfo.id"
        [label]="fieldInfo.caption"
        [theme]="fieldInfo.theme"
        (value-changed)="onValueChanged($event)"
        ngDefaultControl
      >
        <vaadin-radio-button *ngFor="let att of fieldInfo.attributes"
          [value]="att.value.key"
          [label]="att.value.value"
          [checked]="this.formGroup.controls[this.fieldInfo.id].value === att.value.key"
        ></vaadin-radio-button>
      </vaadin-radio-group>
    </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // changeDetection: ChangeDetectionStrategy.OnPush, comented in order to make the validation work would be good in terms of preformance to include it again
  imports:[ReactiveFormsModule, CommonModule]
})
export class EnumInputAdapterComponent implements OnInit {
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