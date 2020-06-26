export class DataTableConfig {
  defaultFirstRow: number = 1;
  defaultRowsPerPage: number = 30;
  defaultSortField: string;

  firstRow: number = 1;
  rowsPerPage: number = 30;

  sortField: string;
  sortOrder: number;

  maxPageLinks: number = 5;
  rowsPerPageOptions: number[] = [10, 20, 30];
  emptyMessage: string = 'Nenhum Dado Encontrado';

  constructor(options?: { emptyMessage: string, defaultSortField?: string }) {
    if (options) {
      this.emptyMessage = options.emptyMessage;
      this.defaultSortField = options.defaultSortField;
    }
  }
}
