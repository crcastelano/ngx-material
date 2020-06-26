import { Injectable } from '@angular/core';

@Injectable()
export class GlobalState {

  private API_URL: string;
  private DOMAIN: string = window.location.hostname;

  constructor() {
    this.setApiURL();
  }

  setApiURL(): void {
    this.API_URL = `http://${this.DOMAIN}:7000`;
  }

  getApiURL(): string {
    return this.API_URL;
  }
}
