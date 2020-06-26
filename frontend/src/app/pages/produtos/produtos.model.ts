export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    estoque: number;
    precoVenda: number;
}

export type Query = {
  allProdutos: Produto[];
}
