import gql from 'graphql-tag';

export const getPaginatedCadastroProdutoQuery = `
  query produtos($first: Int!, $page: Int, $condition: ProdutoCondition) {
    produtos(first: $first, page: $page, condition: $condition) {
      paginatorInfo {
        total
      }
      data {
        id
        nome
        sexo
        cpf
        rg
        data_cadastro
        email
      }
    }
  }
`;

export const getAllProdutoQuery = gql`
  query produtos($condition: ProdutoCondition) {
    produtos(first: 50, condition: $condition) {
      nodes {
        createdAt
        deletedAt
        descricao
        estoque
        estoqueMaximo
        estoqueMinimo
        id
        idLegado
        idUnidadeMedida
        nome
        pesoBruto
        pesoLiquido
        precoCusto
        precoPromocao
        precoVenda
        updatedAt
      }
    }
  }
`;

export const  getUnidadeMedidaQuery = gql`
query unidadeMedidas($condition: UnidadeMedidaCondition) {
  unidadeMedidas(orderBy: SIGLA_ASC, condition: $condition) {
    nodes {
      id
      text: sigla
    }
  }
}
`;

export const createProdutoMutation = gql`
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

export const updateProdutoMutation = gql`
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

export const deleteProdutoMutation = gql`
  mutation deleteProduto($input: DeleteProdutoInput!) {
    deleteProduto(input: $input) {
      clientMutationId
      deletedProdutoNodeId
    }
  }
`;
