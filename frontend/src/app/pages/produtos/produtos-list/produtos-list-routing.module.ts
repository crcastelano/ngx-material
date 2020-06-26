import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosListComponent } from './produtos-list.component';

const routes: Routes = [
  {
    path: '',
       component: ProdutosListComponent,
  },
  {
    path: '**',
    redirectTo: '', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosListRoutingModule { }

export const routedComponents = [
  ProdutosListComponent,
];
