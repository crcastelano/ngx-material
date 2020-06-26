import { ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { nullToNumber } from 'app/providers/utils/rxjs/operators';

import Swal from 'sweetalert2';

import { combineLatest, Observable, of as observableOf } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface FormRule {
  targetControl: AbstractControl;
  operandsControls: AbstractControl[];
  projection: (...values: any[]) => any;
}

export interface FormRuleFactory {
  // tslint:disable-next-line: callable-types
  (sourceForm: FormGroup): FormRule[];
}

export class FormHelper {
  static applyFormRule(formRule: FormRule): Observable<any> {
    const operandsObservable: Observable<
      any
    >[] = formRule.operandsControls.map((control) =>
      control.valueChanges.pipe(startWith(control.value)),
    );

    return combineLatest(operandsObservable, formRule.projection).pipe(
      map((targetValue) => formRule.targetControl.setValue(targetValue)),
    );
  }

  static forEachControlInTree(
    source: AbstractControl,
    callback: (c: AbstractControl) => void,
  ): void {
    callback(source);
    if ('controls' in <FormGroup | FormArray>source) {
      for (const control in (<FormGroup | FormArray>source).controls) {
        if (control) {
          FormHelper.forEachControlInTree(source.get(control), callback);
        }
      }
    }
  }

  static markAllAsTouched(
    form: AbstractControl,
    changeDetector?: ChangeDetectorRef,
  ): void {
    if (changeDetector) {
      changeDetector.markForCheck();
    }

    const markAsTouched = (control: AbstractControl) => control.markAsTouched();

    FormHelper.forEachControlInTree(form, markAsTouched);
  }

  static markAllAsDirty(
    form: AbstractControl,
    changeDetector?: ChangeDetectorRef,
  ): void {
    if (changeDetector) {
      changeDetector.markForCheck();
    }

    const markAsDirty = (control: AbstractControl) => control.markAsDirty();

    FormHelper.forEachControlInTree(form, markAsDirty);
  }

  static getAllControlsByName(
    form: AbstractControl | FormControl | FormGroup | FormArray,
    controlName: string,
    extra: { recursive: boolean } = { recursive: false },
  ): AbstractControl[] {
    const result = [];

    // tslint:disable-next-line: no-shadowed-variable
    const searchForControl = (source: AbstractControl, controlName: string) => {
      // tslint:disable-line

      // Se source for um FormGroup e existir um control
      // com nome controlName, insira o control no array result
      if (FormHelper.isFormGroup(source) && controlName in source.controls) {
        result.push(source.get(controlName));
      }

      // Se a chamada do método não for recursiva e se source for um FormArray,
      // verifique se cada control do FormArray é um FormGroup, e caso exista um
      // control com nome controlName no FormGroup, insira o control no array result
      if (!extra.recursive && FormHelper.isFormArray(source)) {
        for (const control of source.controls) {
          if (
            FormHelper.isFormGroup(control) &&
            controlName in control.controls
          ) {
            result.push(control.get(controlName));
          }
        }
      }

      // Se a chamada do método for recursiva, chame searchForControl recursivamente
      // para cada control, verifique se ele é um FormGroup e insira o control
      if (extra.recursive) {
        if (FormHelper.isFormGroup(source) || FormHelper.isFormArray(source)) {
          for (const control in source.controls) {
            if (control) {
              searchForControl(source.get(control), controlName);
            }
          }
        }
      }
    };

    searchForControl(form, controlName);

    return result;
  }

  static createFormArrayFor(
    key: string,
    obj: any,
    createFormGroup: (value: any) => FormGroup,
  ): FormArray {
    return !obj || !(key in obj) || !obj[key].length
      ? new FormArray([])
      : new FormArray(obj[key].map(createFormGroup));
  }

  static bindCalculatedControl(
    targetControl: FormControl,
    sourceControls: FormControl[],
    projection: (...values: number[]) => number,
  ): void {
    const sourceObservables = sourceControls.map((control) =>
      control.valueChanges.pipe(startWith(control.value), nullToNumber()),
    );

    combineLatest(sourceObservables, projection).subscribe((valorTotal) => {
      targetControl.setValue(valorTotal);
    });
  }

  static showInvalidDataAlert(): void {
    Swal.fire(
      'Dados inválidos',
      'Verifique os campos marcados como inválidos.',
      'warning'
    );
  }

  static isFormGroup(
    abstractControl: AbstractControl | FormControl | FormGroup | FormArray,
  ): abstractControl is FormGroup {
    return (
      'controls' in abstractControl &&
      typeof abstractControl.controls === 'object' &&
      !(abstractControl.controls instanceof Array)
    );
  }

  static isFormArray(
    abstractControl: AbstractControl | FormControl | FormGroup | FormArray,
  ): abstractControl is FormArray {
    return (
      'controls' in abstractControl && abstractControl.controls instanceof Array
    );
  }

  static createFormData(object: object): FormData {
    const formData = new FormData();
    for (const key in object) {
      if (key) {
        formData.append(key, object[key]);
      }
    }
    return formData;
  }
}
