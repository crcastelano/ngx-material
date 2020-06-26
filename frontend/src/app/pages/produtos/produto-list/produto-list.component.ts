import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { map, switchMap } from 'rxjs/operators';

import { TabelaBase } from '../../../classes/TabelaBase';
import { DataTableConfig } from '../../../classes/DataTableConfig';
import { ProdutosGQL } from '../produtos.GQL';

@Component({
  selector: 'ngx-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss'],
})
export class ProdutoListComponent extends TabelaBase implements OnInit {

  produtos: any;

  dataTableConfig = new DataTableConfig({
    emptyMessage: 'Nenhum Registro Encontrado',
    defaultSortField: 'nome',
  });

  sexoOptions: any = [
    { key: 'FEMININO', value: 'Feminino' },
    { key: 'MASCULINO', value: 'Masculino' },
  ];

  constructor(
    router: Router,
    route: ActivatedRoute,
    private fb: FormBuilder,
    private produtosGQL: ProdutosGQL,
  ) {
    super(router, route);
  }

  ngOnInit() {
    this.form = this.fb.group({
      data_cadastro: null,
      data_cadastro_inicio: null,
      data_cadastro_final: null,
      cpf: null,
      rg: null,
      sexo: null,
      nome: null,
      email: null,
    });
    // this.listObservableCallback = params => this.produtosGQL.search({ ...params });
    super.initializeComponent();
  }

  excluir(interessado: any): void {
    Swal.fire({
      title: 'Deseja excluir o interessado?',
      text: 'O interessado será excluído e não será possível reverter essa operação pelo sistema.',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: 'rgb(170, 170, 170)',
      confirmButtonColor: 'rgb(207, 52, 39)',
      cancelButtonText: 'Não, cancelar',
      confirmButtonText: 'Sim, excluir',
      reverseButtons: true,
    }).then((result) => {
      // if (result.value) {
      //   this.produtosGQL.delete(interessado.id).pipe(
      //     map(() => this.mergeQueryParams(this.queryParamsConfig, 'refetchQuery')),
      //     switchMap(this.listObservableCallback),
      //   ).subscribe(searchResponse => {
      //     this.collection = searchResponse.data;
      //     this.totalRecords = searchResponse.paginatorInfo.total;
      //     Swal.fire(
      //       'Excluído!',
      //       'O interessado foi excluído com sucesso.',
      //       'success',
      //     );
      //   });
      // }
    });
  }
}
