import { Observable } from 'rxjs/internal/Observable';
import { pluck } from 'rxjs/internal/operators/pluck';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProdutosGQL {

  constructor(private apollo: Apollo) { }

  private getAllProdutoQuery = gql`
    query produtos($condition: ProdutoCondition) {
      produtos(first: 50, condition: $condition) {
        nodes {
          id
          nome
          descricao
          precoVenda
          estoque
        }
      }
    }
  `;

  private createProdutoMutation = gql`
    mutation createProduto($input: CreateProdutoInput!) {
      createProduto(input: $input) {
        clientMutationId
        produto {
          id
          nome
        }
      }
    }
  `;

  private updateProdutoMutation = gql`
    mutation updateProduto($input: UpdateProdutoInput!) {
      updateProduto(input: $input) {
        produto {
          id
        }
      }
    }
  `;
 /*
   *** Exemplo updateProdutoMutation
    {
      "input": {
        "patch": {
          "nome": "teste"
        },
        "id": 56162
      }
    }
*/

  private deleteProdutoMutation = gql`
    mutation deleteProduto($input: DeleteProdutoInput!) {
      deleteProduto(input: $input) {
        clientMutationId
        deletedProdutoNodeId
      }
    }
  `;

  public getAllProduto(condition: any): Observable<any> {
    return this.apollo.query<any>({
      query: this.getAllProdutoQuery,
      variables: {
        condition
      },
    }).pipe(pluck('data', 'produtos'));
  }

  public createProduto(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: this.createProdutoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'createProduto'));
  }

  public updateProduto(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: this.updateProdutoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'updateProduto'));
  }

  public deleteProduto(input: any): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: this.deleteProdutoMutation,
      variables: {
        input,
      },
    }).pipe(pluck('data', 'deleteProduto'));
  }

}
