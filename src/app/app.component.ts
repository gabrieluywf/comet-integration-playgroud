import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <form [formGroup]="myForm" (ngSubmit)="onSubmit()" style="padding:30px">
    <text-input-adapter [formGroup]="myForm" [fieldInfo]="nameFieldInfo"></text-input-adapter>
    <int-input-adapter [formGroup]="myForm" [fieldInfo]="ageFieldInfo"></int-input-adapter>
    <date-input-adapter [formGroup]="myForm" [fieldInfo]="dateFieldInfo"></date-input-adapter>
    <enum-input-adapter [formGroup]="myForm" [fieldInfo]="travelFieldInfo"></enum-input-adapter>
    <br>
    <button type="submit" theme="primary" class="btn btn-primary">Submit</button>
  </form>
  <br>
  <div style="padding:30px">
    <strong> Form data </strong>
    <pre> {{ myForm.value | json }}</pre>
    <strong> Age input </strong>
    <pre> {{  this.myForm.controls['age'].errors | json }}</pre>
    <pre> {{  this.myForm.controls['age'].touched | json }}</pre>
  </div>
  `,
})
export class AppComponent {
  title = 'comet-test';
  public myForm: FormGroup;

  public nameFieldInfo = { id: 'name', caption:'Name', validations: [{type:'NotEmpty'}]}
  public ageFieldInfo = { id: 'age', caption:'Age', validations: [{type:'NotEmpty'}]}
  public dateFieldInfo = { id: 'date', caption:'Date', validations: [{type:'NotEmpty'}]}
  public travelFieldInfo = { 
    id: 'travel',
    caption:'Travel',
    thheme: 'horizontal',
    attributes: [
      {
        key: 'choice',
        value: {
          key: 'economy',
          value: 'Economy'
        }
      },
      {
        key: 'choice',
        value: {
          key: 'business',
          value: 'Business'
        }
      },
      {
        key: 'choice',
        value: {
          key: 'firstClass',
          value: 'First Class'
        }
      }
    ],
    validations: [{type:'NotEmpty'}]
  }



  constructor(private formBuilder: FormBuilder) {
    // this is the form definition you can play with the default values
    this.myForm = this.formBuilder.group({
      name: [12, Validators.required],
      age: [undefined, [Validators.required, Validators.min(1), Validators.max(10)]],
      date: ['2023-07-05T03:00', Validators.required],
      travel: ['economy', Validators.required]
    });
  }


  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      /* 
        The main issue lies in this section, specifically with the validations.
        I managed to find a solution, but it appears somewhat hacky, and as a result,
        I had to remove the OnPush change detection strategy, which may impact performance.
      */
      console.log('Data to send:', this.myForm.value);
      // Clear the form
      this.myForm.reset();
    }
    else {
      console.log('Invalid form:', this.myForm);
    }
  }
}