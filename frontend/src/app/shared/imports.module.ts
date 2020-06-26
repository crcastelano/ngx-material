import { NbCardModule,
         NbTreeGridModule,
         NbIconModule,
         NbInputModule,
         NbButtonModule,
         NbActionsModule,
         NbUserModule,
         NbCheckboxModule,
         NbRadioModule,
         NbDatepickerModule,
         NbSelectModule,
         NbSearchModule
  } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { TablesRoutingModule } from '../pages/tables/tables-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsRoutingModule } from '../pages/forms/forms-routing.module';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonModule,
  MatButtonToggleModule,
];

export const tables = [
  NbCardModule,
  NbTreeGridModule,
  NbIconModule,
  NbInputModule,
  ThemeModule,
  TablesRoutingModule,
  Ng2SmartTableModule,
  NbButtonModule,
];

export const forms = [
  ThemeModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbActionsModule,
  NbUserModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  FormsRoutingModule,
  NbSelectModule,
  NbIconModule,
  NbSearchModule,
  ...materialModules,
];

export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  max: 9999999999.99,
};
