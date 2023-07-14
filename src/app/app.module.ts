import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { IntInputAdapterComponent } from './adapters/int-input/int-input.adapter.component';
import { DateInputAdapterComponent } from './adapters/date/date-input.adapter.componen';
import { TextInputAdapterComponent } from './adapters/text-input/text-input.adapter.component';
import { EnumInputAdapterComponent } from './adapters/enum-input/enum-input.adapter.component';
import { IntInputErrorsAdapterComponent } from './adapters/int-input-errors/int-input-errors.adapter.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IntInputAdapterComponent,
    DateInputAdapterComponent,
    TextInputAdapterComponent,
    EnumInputAdapterComponent,
    IntInputErrorsAdapterComponent,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
