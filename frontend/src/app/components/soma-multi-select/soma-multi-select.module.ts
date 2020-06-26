import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SomaMultiSelectComponent } from './soma-multi-select.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  declarations: [
    SomaMultiSelectComponent,
  ],
  exports: [
    SomaMultiSelectComponent,
  ],
})
export class SomaMultiSelectModule { }
