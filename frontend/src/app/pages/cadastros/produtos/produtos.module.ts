import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule, routedComponents } from './produtos-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
  ],
})
export class ProdutosModule {}
