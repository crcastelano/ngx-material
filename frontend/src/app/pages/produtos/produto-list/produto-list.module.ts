import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

import { FilterPipe } from 'app/pipes/filter.pipe';
import { ProdutoListRoutingModule, routedComponents } from './produto-list-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SomaCalendarModule } from 'app/components/soma-calendar/soma-calendar.module';
import { ProdutosGQL } from '../produtos.GQL';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ProdutoListRoutingModule,
    TableModule,
    ButtonModule,
    NbButtonModule,
    FileUploadModule,
    SomaCalendarModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  declarations: [
    ...routedComponents,
    FilterPipe,
  ],
  providers: [
    ProdutosGQL,
  ],
})
export class ProdutoListModule { }
