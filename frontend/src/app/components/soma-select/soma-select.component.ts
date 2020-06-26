import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'soma-select',
  templateUrl: './soma-select.component.html',
})
export class SomaSelectComponent implements OnInit {

  // Obrigatórios
  @Input() columnToShow: string;
  @Input() data: any;
  @Input() form: FormGroup;
  @Input() parentControlName: string;

  // Opcionais
  @Input() columnToEmit: string = 'id';
  @Input() label: string;
  @Input() required: boolean;

  ngOnInit() {
    if (this.required) {
      this.form.get(this.parentControlName).setValidators(Validators.required);
    }
  }

}
