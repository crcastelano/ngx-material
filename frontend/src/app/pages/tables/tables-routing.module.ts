import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
// import { ProdutosListComponent } from '../cadastros/produtos/produtos-list/produtos-list.component';
// import { ProdutosFormComponent } from '../cadastros/produtos/produtos-form/produtos-form.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
    // {
    //   path: 'produtos',
    //   component: ProdutosListComponent,
    // },
    // {
    //   path: 'produto-add',
    //   component: ProdutosFormComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  TreeGridComponent,
  // ProdutosListComponent,
  // ProdutosFormComponent,
];
