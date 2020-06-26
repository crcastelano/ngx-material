import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AnexoService {

  /**
   * URL do endpoint.
   * @type {String}
   */
  private endpoint = '/paciente/importacao';

  /**
   * [constructor description]
   * @param {HttpInterceptor} private http [description]
   */
  constructor(private http: HttpService ) {}

  downloadPlanilha(): Observable<any> {
    return this.http.getFile(`${this.endpoint}`, `Combate Coronavírus - Planilha de controle de pacientes.xlsx`);
  }

  postFile(id_interessado: number, id_tipo_anexo_cadastro_interessado: number, files: any) {
    // tslint:disable-next-line: max-line-length
    const adEndpoint = `/cadastro-interessado/${id_interessado}/tipo-anexo/${id_tipo_anexo_cadastro_interessado}`;
    return this.http.postFile(adEndpoint, files);
  }
}
