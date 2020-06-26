import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface APIResponse {
  code: number;
  data: any;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) { }

  /**
   * Transforma o objeto params para HttpParams, convertendo
   * propriedades que são arrays para o formato 'key[]: value'
   * Ex: { with[]: 'tipoMunicipio' }
   *
   * @param  {object}          params Parâmetros da requisição GET
   * @return {HttpParams}
   */
  private createHttpParams(params: object): HttpParams {
    let searchParams = new HttpParams();

    for (const key in params) {
      if (params[key] instanceof Array) {
        params[key].forEach(element => (searchParams = searchParams.append(`${key}[]`, element)));
      } else {
        searchParams = searchParams.set(key, params[key]);
      }
    }

    return searchParams;
  }

  // RESTful API Methods
  // ======================================================

  /**
   * Abstrai a implementação da requisição HTTP GET
   *
   * @param  {string}          route Caminho do endpoint: '/v1/usuarios'
   * @param  {object}          query Opcional. Filtros: '?campos=nome&limite=5'
   * @return {Observable<any>}
   */
  get(route: string, query?: object): Observable<any> {
    const params = query ? this.createHttpParams(query) : null;
    return this.http.get<APIResponse>(route, { params }).pipe(map(res => res.data));
  }

  /**
   * Abstrai a implementação da requisição HTTP POST
   *
   * @param  {string}          route Caminho do endpoint: '/v1/usuarios'
   * @param  {object}          body  Parâmetros da requisição: '{ nome: 'Foo', idade: 0 }'
   * @return {Observable<any>}
   */
  post(route: string, body: object): Observable<any> {
    return this.http.post<APIResponse>(route, body).pipe(map(res => res.data));
  }

  /**
   * Abstrai a implementação da requisição HTTP PATCH
   *
   * @param  {string}          route Caminho do endpoint: '/v1/usuarios/1'
   * @param  {object}          body  Parâmetros da requisição: '{ nome: 'Bar', idade: 1 }'
   * @return {Observable<any>}
   */
  patch(route: string, body: any): Observable<any> {
    return this.http.patch<APIResponse>(route, body).pipe(map(res => res.data));
  }

  /**
   * Abstrai a implementação da requisição HTTP DELETE
   *
   * @param  {string}          route Caminho do endpoint: '/v1/usuarios/1'
   * @return {Observable<any>}
   */
  delete(route: string): Observable<any> {
    return this.http.delete<APIResponse>(route).pipe(map(res => res.data));
  }

  deleteWithParams(route: string, query?: object): Observable<any> {
    const params = query ? this.createHttpParams(query) : null;
    return this.http.delete<APIResponse>(route, { params }).pipe(map(res => res.data));
  }


  /**
   * Abstrai a implementação da requisição HTTP GET para Arquivos
   *
   * @param  {string}           route     Caminho do endpoint: '/v1/usuarios'
   * @param  {string}           fileName  Nome do arquivo que será baixado.
   * @param  {object}           extra     Opcional. Propriedades: params, previewFile
   * @return {Observable<any>}
   */
  getFile(
    route: string,
    fileName: string = '',
    extra?: { params?: any; previewFile?: boolean }
  ): Observable<any> {
    const options = extra || { params: null, previewFile: false };
    return this.http.get(route, { responseType: 'blob', params: options.params }).pipe(
      map(res => {
        if (options.previewFile && res.type === 'application/pdf') {
          return window.open(URL.createObjectURL(res));
        }
        return saveAs(res, fileName);
      }),
    );
  }

  /**
   * Abstrai a implementação da requisição HTTP POST para arquivos
   *
   * @param  {string}          route Caminho do endpoint: '/v1/usuarios'
   * @param  {object}          file  Arquivo da requisição
   * @return {Observable<any>}
   */
  postFile(route: string, file: any): Observable<any> {
    const request = new HttpRequest('POST', route, file, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request<APIResponse>(request);
  }

  postWithFile(route: string, params: any, files: File): Observable<any> {
    const formData = new FormData();

    formData.append('arquivo', files, files.name);

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        formData.append(key, Array.isArray(params[key]) ? JSON.stringify(params[key]) : params[key]);
      }
    }

    return this.http.post(route, formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }
}
