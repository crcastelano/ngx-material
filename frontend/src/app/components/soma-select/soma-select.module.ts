import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SomaSelectComponent } from './soma-select.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SomaSelectComponent,
  ],
  exports: [
    SomaSelectComponent,
  ],
})
export class SomaSelectModule { }
