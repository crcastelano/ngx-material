import { Observable } from 'rxjs/internal/Observable';
import { pluck } from 'rxjs/internal/operators/pluck';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  getAllProdutoQuery,
  getUnidadeMedidaQuery,
  createProdutoMutation,
  updateProdutoMutation,
  deleteProdutoMutation,
} from './produtos.GQL.query';

@Injectable({
  providedIn: 'root',
})
export class ProdutosGQL {

  constructor(private apollo: Apollo) { }

  public getAllProduto(condition: any): Observable<any> {
    return this.apollo.query<any>({
      query: getAllProdutoQuery,
      variables: {
        condition
      },
    }).pipe(pluck('data', 'produtos'));
  }

  public getAllUnidadeMedida(condition: any): Observable<any> {
    return this.apollo.query<any>({
      query: getUnidadeMedidaQuery,
      variables: {
        condition
      },
    }).pipe(pluck('data', 'unidadeMedidas'));
  }

  public createProduto(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: createProdutoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'createProduto'));
  }

  public updateProduto(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: updateProdutoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'updateProduto'));
  }

  public deleteProduto(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: deleteProdutoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'deleteProduto'));
  }
}
