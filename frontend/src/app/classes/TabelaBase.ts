import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QueryParamsConfig } from './QueryParamsConfig';
import { map, switchMap, tap } from 'rxjs/operators';
import { DataTableConfig } from './DataTableConfig';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class TabelaBase implements OnDestroy {
  form: FormGroup;
  listObservableCallback: (params: object) => Observable<any>;

  collection: any[];
  totalRecords: number;
  isLoading: boolean;
  searched: boolean;

  subscription: Subscription;

  queryParamsConfig: QueryParamsConfig;
  dataTableConfig = new DataTableConfig({ emptyMessage: 'Nenhum Dado Encontrado' });

  constructor(protected router: Router, protected route: ActivatedRoute) { }

  initializeComponent(): void {
    if (!this.form) {
      throw new Error('[TabelaBase] A variável form está undefined');
    }

    if (!this.listObservableCallback) {
      throw new Error('[TabelaBase] A variável listObservableCallback está undefined');
    }

    this.subscription = this.route.queryParamMap
      .pipe(
        tap(() => (this.isLoading = true)),
        map((paramMap: ParamMap) => (this.queryParamsConfig = new QueryParamsConfig(paramMap))),
        tap(this.patchFiltersForm),
        tap(this.setExportXlsObservable),
        map(() => this.mergeQueryParams(this.queryParamsConfig)),
        switchMap(this.listObservableCallback),
        tap(this.setDatatable),
      )
      .subscribe(searchResponse => {
        this.isLoading = false;
        this.searched = this.queryParamsConfig.filters ? true : false;
        this.collection = searchResponse.data;
        this.totalRecords = searchResponse.paginatorInfo.total                                ;
      });
  }

  onRowSelect(rowData): void {
    this.router.navigate([`../../../${rowData.id}/edit`], { relativeTo: this.route });
  }

  private patchFiltersForm = (queryParamsConfig: QueryParamsConfig): void => {
    if (queryParamsConfig.filters) {
      this.form.patchValue(queryParamsConfig.filters);
    }
  }

  private setDatatable = (): void => {
    this.dataTableConfig = {
      ...this.dataTableConfig,
      ...this.queryParamsConfig.sortParams,
      firstRow:
        this.queryParamsConfig.paginationParams.offset || this.dataTableConfig.defaultFirstRow,
      rowsPerPage:
        this.queryParamsConfig.paginationParams.limit || this.dataTableConfig.defaultRowsPerPage,
    };
  }

  setExportXlsObservable = (queryParamsConfig: QueryParamsConfig) => { };

  mergeQueryParams = (queryParamsConfig: QueryParamsConfig, refetchQuery?: string): object => {
    let params = {
      ...queryParamsConfig.paginationParams,
      filter: {
        ...queryParamsConfig.filters,
        orderBy: [{
          // tslint:disable-next-line: max-line-length
          field: queryParamsConfig.sortParams.sortField ? queryParamsConfig.sortParams.sortField : this.dataTableConfig.defaultSortField,
          order: queryParamsConfig.sortParams.sortOrder === -1 ? 'DESC' :  'ASC',
        }],
      },
    };

    params = params.limit ? params : { ...params, limit: this.dataTableConfig.defaultRowsPerPage };
    params = refetchQuery ? { ...params, ...{ refetchQuery: true } } : params;
    return params;
  }

  search(filters: any): void {
    for (const field in filters) {
      if (!filters[field]) {
        delete filters[field];
      }
    }
    if (!Object.keys(filters).length) {
      this.clearFilters();
      return;
    }

    const queryParams = { ...filters, sortField: null, sortOrder: null, offset: 0 };
    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }

  sortColumn(sort): void {
    const queryParams = { sortField: sort.field, sortOrder: sort.order, offset: 0 };
    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }

  goToPage(page): void {
    const queryParams = { offset: page.first, limit: page.rows };
    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }

  clearFilters(): void {
    this.form.reset();
    const queryParams = { limit: this.route.snapshot.queryParams.limit };
    this.router.navigate([], { queryParams });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
