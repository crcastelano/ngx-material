import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'soma-multi-select',
  templateUrl: './soma-multi-select.component.html',
  styleUrls: ['./soma-multi-select.component.scss'],
})
export class SomaMultiSelectComponent implements OnInit {
  options: SelectItem[];
  // Obrigatórios
  @Input() columnToShow: string;
  @Input() form: FormGroup;
  @Input() parentControlName: string;
  @Input() set data(data: any[]) {
    this.options = data && this.createOptions(data);
  }

  // Opcionais
  @Input() columnToEmit: string = 'id';
  @Input() label: string;
  @Input() required: boolean;
  @Input() selectionLabel: string = 'Selecione';
  @Input() selectedItemsLabel: string = '{0} items selecionados';
  @Input() limit: number = 360;

  ngOnInit() {
    if (this.required) {
      this.form.get(this.parentControlName).setValidators(Validators.required);
    }
  }

  private createOptions(data: any[]): SelectItem[] {
    return data.map(item => {
      return {
        label: item[this.columnToShow],
        value: item[this.columnToEmit],
      };
    });
  }

  onChange(e) {
    if (e.value.length > this.limit) { 
      const valueLimited = e.value.slice(0, this.limit);  
      this.form.get(this.parentControlName).setValue(valueLimited);
    }
  }
}
