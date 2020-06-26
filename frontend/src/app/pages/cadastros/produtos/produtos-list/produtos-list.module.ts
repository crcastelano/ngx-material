import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosListRoutingModule, routedComponents } from './produtos-list-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ProdutosListRoutingModule,
  ]
})
export class ProdutosListModule {}
