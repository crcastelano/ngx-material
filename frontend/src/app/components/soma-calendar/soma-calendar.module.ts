import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SomaCalendarComponent } from './soma-calendar.component';

import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SomaCalendarComponent,
  ],
  exports: [
    SomaCalendarComponent,
  ],
})
export class SomaCalendarModule { }
