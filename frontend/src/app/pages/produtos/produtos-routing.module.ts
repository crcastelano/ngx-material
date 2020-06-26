import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosComponent } from './produtos.component';

 const routes: Routes = [
  {
    path: '',
    component: ProdutosComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('./produtos-list/produtos-list.module')
          .then(m => m.ProdutosListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./produtos-form/produtos-form.module')
          .then(m => m.ProdutosFormModule),
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./produtos-form/produtos-form.module')
          .then(m => m.ProdutosFormModule),
      },
      {
        path: 'detail/:id',
        loadChildren: () => import('./produtos-form/produtos-form.module')
          .then(m => m.ProdutosFormModule),
      },
      {
        path: '**',
        redirectTo: 'list', pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }

export const routedComponents = [
  ProdutosComponent,
];
