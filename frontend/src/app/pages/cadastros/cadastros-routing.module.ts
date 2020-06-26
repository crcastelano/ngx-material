import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrosComponent } from './cadastros.component';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosListComponent } from './produtos/produtos-list/produtos-list.component';

const routes: Routes = [
  {
    path: '',
    component: CadastrosComponent,
    children: [
      {
        path: 'produtos',
        // component: ProdutosComponent,
        loadChildren: () => import('./produtos/produtos.module')
          .then(m => m.ProdutosModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrosRoutingModule { }
