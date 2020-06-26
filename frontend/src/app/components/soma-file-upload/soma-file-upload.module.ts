import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';

import { SomaFileUploadComponent } from './soma-file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    ProgressBarModule,
  ],
  declarations: [
    SomaFileUploadComponent,
  ],
  exports: [
    SomaFileUploadComponent,
  ],
})
export class SomaFileUploadModule { }
