import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosGQL } from '../produtos.GQL';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

  isLoadingResults = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  colunas = ['id', 'nome', 'descricao', 'estoque', 'precoVenda', 'action'];

  settings = {
    // actions: {
    //   columnTitle: 'Actions',
    //   add: true,
    //   edit: true, // true,
    //   delete: true, // true,
    //   custom: true,
    // },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
      descricao: {
        title: 'Descrição',
        type: 'string',
      },
      estoque: {
        title: 'Estoque',
        type: 'number',
      },
      precoVenda: {
        title: 'Preço de Venda',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
    private produtosGQL: ProdutosGQL,
  ) { }

  ngOnInit() {
    this.produtosGQL.getAllProduto(null).subscribe(response => {
      this.source.load(response.nodes);
    }
    );
  }

  navigateToProdutoCreate(): void {
//    this.router.navigate(['/produtos/create']);
  }

  update(id) {
//    this.router.navigate(['/produtos/update/' + id]);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  delete(idProduto: number) {
    // if (window.confirm('Confirma exclusão do produto ?' + idProduto)) {
    //   this.isLoadingResults = true;
    //   const id = {
    //     id: idProduto
    //   };
    //   this.produtosGQL.deleteProduto(id).subscribe((response) => {
    //     this.isLoadingResults = false;
    //     this.router.navigate(["/produtos"]);
    //   }, (error) => {
    //     console.log('there was an error sending the query', error);
    //     this.isLoadingResults = false;
    //   });
    // }
  }

}
