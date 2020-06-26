import { ParamMap, Params } from '@angular/router';

export class QueryParamsConfig {
  filters: object;
  sortParams: { sortOrder: number; sortField: string };
  paginationParams: { limit: number; offset: number };

  constructor(paramMap: ParamMap) {
    this.sortParams = {
      sortOrder: +paramMap.get('sortOrder'),
      sortField: paramMap.get('sortField'),
    };
    this.paginationParams = { limit: +paramMap.get('limit'), offset: +paramMap.get('offset') };

    this.setFilters(paramMap['params']);
  }

  /**
   * Atribui valor ao objeto 'filters' a partir de 'params', removendo
   * todas as propriedades relacionadas à paginação e ordenação
   *
   * O objeto 'filters' será utilizado para dar patch no form de filtros da listagem
   *
   * @param    {Params} params
   * @returns  {void}
   */
  setFilters(params: Params): void {
    const filters = { ...params };

    // Altera 'filters' removendo propriedades relacionadas à
    // paginação e ordenação, de forma a restar somente os filtros
    this.deleteParams(filters, this.sortParams);
    this.deleteParams(filters, this.paginationParams);

    // Varre as propriedades do objeto 'filters' e transforma o valor
    // de cada uma delas de string para a primitiva correspondente
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        filters[key] = this.inferPrimitive(filters[key]);
      }
    }

    // Retorna null se não houver nenhuma propriedade no objeto 'filters'
    this.filters = Object.keys(filters).length ? filters : null;
  }

  /**
   * Remove todas as propriedades contidas no objeto
   * 'paramsToRemove' de um objeto 'target'
   *
   * @param    {object} target
   * @param    {object} paramsToRemove
   * @returns  {void}
   */
  deleteParams(target: object, paramsToRemove: object): void {
    for (const key in paramsToRemove) {
      if (target.hasOwnProperty(key)) {
        delete target[key];
      }
    }
  }

  /**
   * Infere primitiva com base em um valor string ou um array de strings
   *
   * @param    {string|string[]} value
   * @returns  {boolean|string|number|any[]}
   */
  private inferPrimitive(value: string | string[]): boolean | string | number | any[] {
    if (value instanceof Array) {
      return value.length ? value : null;
    }

    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      case '':
        return null;
      default:
        return !isNaN(+value) ? +value : value;
    }
  }
}
