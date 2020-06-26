import {
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import {
  FormHelper,
  FormRuleFactory,
  FormRule,
} from 'app/providers/utils/form-helper.util';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';

export class FormArrayBase implements OnChanges {
  // Obrigatórios
  @Input() data: any[];
  @Input() convenio: any;
  @Input() formArrayControlName: string;
  @Input() showFormErrors: Subject<any>;
  @Input() mode: 'view' | 'editExisting' | 'editAndAdd' = 'view';
  @Input() disabledControls: string[] = [];
  @Output() onFormValueChanges = new EventEmitter<any>();
  @Output() onDeletedItem = new EventEmitter<any>();

  onFormArrayChanges = new Subject<void>();

  // Opcionais
  @Input() required: boolean;
  @Input() idControlName: string = 'id';
  @Input() keepFormState: boolean;

  // Exige Sync da API
  @Input() canRemoveModelWithId: boolean;

  ruleFactory: FormRuleFactory;
  form: FormGroup;
  formArray: FormArray;
  model: FormGroup;
  formArrayValidators: ValidatorFn[];
  deletedItens: any = [];

  constructor(protected fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes && !changes.data.firstChange) {
      this.initializeComponent();
    }

    if ('mode' in changes && !changes.mode.firstChange && !this.keepFormState) {
      this.initializeComponent();
    }
  }

  loadConfigs() {
    this.onFormArrayChanges.next();

    this.formArray.setValidators(this.formArrayValidators);

    if (this.mode === 'editExisting') {
      this.canRemoveModelWithId = false;
    }

    if (this.required) {
      this.formArray.setValidators(
        Validators.compose([Validators.required, this.formArray.validator])
      );

      const isEmpty: boolean = !this.data || !this.data.length;

      if (isEmpty) {
        this.addItem();
      }
    }
  }

  initializeComponent() {
    this.form = this.form ? this.form : this.fb.group({});

    this.form.setControl(
      this.formArrayControlName,
      this.fb.array(
        this.data && this.data.length
          ? this.data.map((form) => {
            const formCreated = this.createForm();
            formCreated.addControl('id', new FormControl(null));
            return formCreated;
          })
          : [],
      ),
    );

    this.formArray = <FormArray>this.form.get(this.formArrayControlName);

    this.loadConfigs();

    this.form.valueChanges.subscribe((value) => {
      this.onFormValueChanges.emit(this.form);
    });

    this.onFormValueChanges.emit(this.form);

    if (this.data) {
      this.form.get(this.formArrayControlName).patchValue(this.data);
    }

    this.showFormErrors.subscribe(() => {
      FormHelper.markAllAsDirty(this.form);
      FormHelper.showInvalidDataAlert();
    });
  }

  removeItem(index: number): void {
    this.deletedItens.push(this.formArray.value[index].id);
    this.onDeletedItem.emit(this.deletedItens);
    this.formArray.removeAt(index);
    this.onFormArrayChanges.next();
  }

  addItem(): void {
    this.formArray.push(this.createForm());
    this.onFormArrayChanges.next();
  }

  createForm(): FormGroup {
    const form = cloneDeep(this.model);

    if (this.ruleFactory) {
      const rules: FormRule[] = this.ruleFactory(form);
      rules.forEach((rule) => FormHelper.applyFormRule(rule).subscribe());
    }

    this.disableControls(form);

    return form;
  }

  disableControls(form: FormGroup): void {
    if (this.disabledControls.length) {
      for (const controlName of this.disabledControls) {
        if (controlName in form.controls) {
          form.get(controlName).disable();
        }
      }
    }
  }

  disableDelete(control: AbstractControl): boolean {
    const isRequired: boolean = this.required && this.formArray.length === 1;
    const hasId = <boolean>control.get(this.idControlName).value;

    const canRemoveModel: boolean =
      isRequired || (!this.canRemoveModelWithId && hasId);

    return canRemoveModel;
  }
}
