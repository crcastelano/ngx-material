import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosFormRoutingModule, routedComponents } from './produtos-form-routing.module';
import { tables, forms } from '../../../shared/imports.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LSelect2Module } from 'ngx-select2';
import { NgxCurrencyModule } from 'ngx-currency';
import { SomaCalendarModule } from '../../../components/soma-calendar/soma-calendar.module';
import {CalendarModule} from 'primeng/calendar';
import { NbLayoutModule,  NbAutocompleteModule } from '@nebular/theme';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProdutosFormRoutingModule,
    LSelect2Module,
    NgxCurrencyModule,
    SomaCalendarModule,
    CalendarModule,
    NbLayoutModule,
    NbAutocompleteModule,
    tables,
    forms,
  ]
})
export class ProdutosFormModule {}
