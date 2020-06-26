import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosFormComponent } from './produtos-form.component';

const routes: Routes = [
  {
    path: '',
       component: ProdutosFormComponent,
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
export class ProdutosFormRoutingModule { }

export const routedComponents = [
  ProdutosFormComponent,
];
