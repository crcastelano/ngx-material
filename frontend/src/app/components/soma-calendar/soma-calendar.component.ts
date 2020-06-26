import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from 'app/providers/utils/rxjs/operators';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'soma-calendar',
  templateUrl: './soma-calendar.component.html',
})
export class SomaCalendarComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() parentControlName: string;

  control: FormControl = new FormControl();

  ptbrLocale = {
    firstDayOfWeek  : 0,
    dayNamesMin     : ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    dayNamesShort   : ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNames        : ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    monthNamesShort : ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    monthNames      : ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                       'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  };

  @Input() showTime: boolean = false;
  @Input() dataType: string = 'string';
  @Input() style: string;
  @Input() styleClass: string;
  @Input() inputStyle: string;
  @Input() inputStyleClass: string;
  @Input() inputId: string;
  @Input() placeholder: string;
  @Input() monthNavigator: boolean;
  @Input() yearNavigator: boolean;
  @Input() yearRange: string;
  @Input() required: boolean;
  @Input() showSeconds: boolean;
  @Input() readonlyInput: boolean = false;
  @Input() formatDateWithTime: boolean = true;

  ngOnInit() {
    const parentControl = this.form.get(this.parentControlName);

    parentControl.valueChanges.pipe(
      startWith(parentControl.value),
      formatDate('DD/MM/YYYY'),
      distinctUntilChanged(),
    ).subscribe(date => this.control.setValue(date));

    this.control.valueChanges.pipe(
      distinctUntilChanged(),
      this.formatDateWithTime ?
      formatDate('YYYY-MM-DD HH:mm:ss') :
      formatDate('YYYY-MM-DD'),
    ).subscribe(date => {
      parentControl.setValue(date);
      if (this.control.dirty) {
        parentControl.markAsDirty();
      }
    });

    parentControl.statusChanges.pipe(
      startWith(parentControl.status),
    ).subscribe(status => {
      if (status === 'DISABLED') {
        this.control.disable();
      }
    });
  }

}
