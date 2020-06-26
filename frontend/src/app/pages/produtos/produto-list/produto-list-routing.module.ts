import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoListComponent } from './produto-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutoListComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoListRoutingModule { }

export const routedComponents = [
  ProdutoListComponent,
];
