import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosListRoutingModule, routedComponents } from './produtos-list-routing.module';
import { tables, forms } from '../../../shared/imports.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ProdutosListRoutingModule,
    tables,
    forms,
  ]
})
export class ProdutosListModule {}
