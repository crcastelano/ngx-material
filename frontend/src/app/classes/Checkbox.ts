import { Subject } from 'rxjs';

export namespace Checkbox {
  export class Content {
    options: string[];
    route?: string;
    group?: number;
  }

  export class Contents {

    // tslint:disable-next-line: variable-name
    static DadosMonitorados: Content = {
      options: [
        'dados_monitorados',
      ],
    };
  }

  export class Item {
    id: number;
    nome: string;
    icone?: string;
    cor?: string;
    geocamadas_filhas: Checkbox.Item[];
    // tslint:disable-next-line: variable-name
    id_geocamada_pai: number | string;
    checked?: boolean;
  }

  export class Events {
    static onClick: Subject<any> = new Subject();
    static onColorChange: Subject<any> = new Subject();
  }

  export class Utils {
    /**
     * Retorna somente os ids dos itens
     *
     * @static
     * @param {Array<CheckboxItem>} items
     */
    static getIDs(items: Checkbox.Item[]): number[] {
      return items.map(item => {
        return item.id;
      });
    }

    // Retorna ID de uma camada pelo nome
    static getID(nomeCamada: any, items: any): number {
      const camada = items.find((item: any) => {
        return item.nome === nomeCamada;
      });

      return camada.id;
    }

    // Verifica se uma camada existe pelo nome
    static camadaExiste(nomeCamada: string, items: any): boolean {
      const camadaPresente = items.find((item: any) => {
        return item.nome === nomeCamada;
      });

      return camadaPresente !== undefined;
    }

    /**
     * Une todos itens em um array ordenado da mesma forma que os elementos HTML.
     *
     * @private
     * @param {Array<Item>} [items]
     * @param {Array<Item>} [joined=[]]
     * @returns {Array<Item>}
     */
    static joinItems(items: Checkbox.Item[], joined: Checkbox.Item[] = []): Checkbox.Item[] {
      const len: number = items.length;

      for (let i = 0; i < len; i++) {
        joined.push(items[i]);
        if (items[i].geocamadas_filhas.length > 0) {
          this.joinItems(items[i].geocamadas_filhas, joined);
        }
      }

      return joined;
    }
  }
}
