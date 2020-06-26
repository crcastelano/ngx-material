import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  public ids_camadas = new EventEmitter();

  constructor() { }

  public onEmitirEvento(values: any) {
    this.ids_camadas.emit(values);
  }
}
