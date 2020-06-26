import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosGQL } from '../produtos.GQL';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { datasource } from '../produtos-datasource';

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
    selectMode: 'multi',
    mode: 'external',
    actions: {
      columnTitle: 'Ações',
      add: false,
      edit: true, // true,
      delete: true, // true,
      // custom: [
      //   { name: 'viewrecord', title: '<i class="nb-close"></i>' },
      // ],
      position: 'right',
    },
    pager: {
      display: true,
    },
    editor: {
      type: 'checkbox',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
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
    this.source.load( datasource );
    // this.produtosGQL.getAllProduto(null).subscribe(response => {
    //   this.source.load(response.nodes);
    // },
    // );
  }

  onAdd(): void {
    this.router.navigate(['/pages/produtos/create']);
  }

  onEdit(event) {
    this.router.navigate(['/pages/produtos/edit/' + event.data.id]);
  }

  onDetail(event) {
    this.router.navigate(['/pages/produtos/edit/' + event.data.id]);
  }

  onDelete(event) {
    const idProduto = Number(event.data.id);

    Swal.fire({
      title: `Deseja excluir o Produto ? <br>#ID ${idProduto}`,
      text: 'O produto será excluído e não será possível reverter essa operação pelo sistema.',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: 'rgb(170, 170, 170)',
      confirmButtonColor: 'rgb(207, 52, 39)',
      cancelButtonText: 'Não, cancelar',
      confirmButtonText: 'Sim, excluir',
      reverseButtons: true,
    }).then((result) => {
      this.isLoadingResults = true;
      const id = {
        id: idProduto,
      };
      this.produtosGQL.deleteProduto(id).subscribe((response) => {
        this.isLoadingResults = false;
        this.router.navigate(["/pages/produtos"]);
      });
    }, (error) => {
      Swal.fire(
        'Excluído!',
        'O usuário foi excluído com sucesso.',
        'success',
      );
      this.isLoadingResults = false;
    },
    );
  }

  exportAsXLSX(): void {
    // const data = Object.assign({}, ...this.source);
    // this.excelService.exportAsExcelFile( Array.from(this.source), 'sample');
  }

}
