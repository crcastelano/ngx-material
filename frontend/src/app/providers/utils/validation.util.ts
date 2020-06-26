import { FormControl, Validators } from '@angular/forms';

interface ValidationResult {
    [key:string]:boolean;
}

export class ValidationUtil {


  /**
   * Lista de expressões regulares (regex) para validação
   * de campos de formulário.
   *
   * Alimentam as funções abaixo.
   *
   */
  private static regexArterisKm    = /^\s?[0-9]{0,3}\s?$/;
  private static regexArterisMetro = /^\s?[0-9]{0,4}\s?$/;

  private static regexCEP = /^\s?([0-9]{5}\-[0-9]{3})?\s?$/;

  private static regexData = /^\s?(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))?\s?$/;

  private static regexNumeroInteiro = /^\s?[0-9]*\s?$/;
  private static regexNumeroDecimal = /^\s?(\d+(\.\d+)*)?\s?$/;
  private static regexPorcentagem = /^(100|([\d]{1,2}(\.[\d]{1,2})?))$/;

  private static regexTelOuCel = /^\s?(\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4})?\s?$/;

  private static regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private static regexNome        = /^\s?([A-zÀ-ÿ]+ ?)*\s?$/;
  private static regexNomeENumero = /^\s?([0-9A-zÀ-ÿ ]+ ?)*\s?$/;
  private static regexTexto       = /^\s?[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':"\|,.<>\/? ]*\s?$/;

  private static regexProcesso    = /^\s?([0-9]{2,4}\/[12][0-9]{3})?\s?$/;

  private static regexFolha    = /^\s?([0-9]{1,4}(\/[0-9]{1,4})*)?\s?$/;

  private static regexLatitudeGD  = /^\s?([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?))?\s?$/;
  private static regexLongitudeGD = /^\s?([-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?))?\s?$/;

  private static regexLatitudeGMS  = /^\s?(([0-8]?[0-9])[°\º] ?([0-5]?[0-9])\' ?(([0-5]?[0-9]){1}(\.[0-9]{1,9})?)(\"|\'{2})|(90[°\º] ?0{1,2}\' ?0{1,2}(\.0{1,9})?)(\"|\'{2})) ?([SNsn])\s?$/;
  private static regexLongitudeGMS = /^\s?(([1][0-7][0-9]|[0-9]?[0-9])[°\º] ?([0-5]?[0-9])\' ?(([0-5]?[0-9]){1}(\.[0-9]{1,9})?)(\"|\'{2})|(180[°\º] ?0{1,2}\' ?0{1,2}(\.0{1,9})?)(\"|\'{2})) ?([EOLWeolw])\s?$/;

  private static regexNorteUTM = /^\s?([0-9]{1,8}){1}(\.\d{1,9})?\s?$/;
  private static regexLesteUTM = /^\s?([0-9]{1,9}){1}(\.\d{1,9})?\s?$/;
  private static regexZonaUTM  = /^\s?(0?[1-9]|[1-5][0-9]|60)\s?$/;
  private static regexLetraUTM = /^\s?([A-Za-z]){1}\s?$/;


  /**
   * Valida apenas se o campo é vazio ou composto apenas
   * por espaços. Útil quando o campo é obrigatório mas não
   * necessita algum formato/valor específico.
   *
   * Pode ser combinado com outras validações, como nome, data, etc.
   *
   */
  static required(control: FormControl): ValidationResult {
    const isValid = control.value.trim().length !== 0;

    return isValid ? null : { 'invalidfield': true };
  }


  /**
   * Valida se o valor digitado é maior que 0
   * @param  {FormControl}      control [description]
   * @return {ValidationResult}         [description]
   */
  static valueRequired(control: FormControl): ValidationResult {
    const isValid = Number(control.value) > 0;
    return isValid ? null : { 'invalidnumber': true };
  }

  /**
   * Invalida o campo caso não seja detectada uma data válida.
   *
   * NÃO SUBSITUI A NECESSIDADE DE Validators.required
   *
   *
   * Exemplo de uso:
   *
   * this.form = fb.group({
   *   'data_obrigatoria':  ['', Validators.compose([Validators.required, ValidationUtil.isValidDate])],
   *   'data_opcional':     ['', ValidationUtil.isValidDate]
   * });
   */
  static isValidDate(control: FormControl): ValidationResult {
    if (!control.value) {
      return null;
    }

    if (!ValidationUtil.regexData.test(control.value)) {
      return { 'invaliddate': true };
    }

    const temp = control.value.split('/'),
      d = parseInt(temp[0], 10),
      m = parseInt(temp[1], 10),
      y = parseInt(temp[2], 10),
      date = new Date(y, m - 1, d),
      isValid = (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);

    return isValid ? null : { 'invaliddate': true };
  }

  /**
   * Invalida o campo caso só existam espaços no campo.
   * Caso o campo for obrigatório, não usar esta validação,
   * mas sim ValidationUtil.required.
   *
   * NÃO SUBSITUI A NECESSIDADE DE Validators.required
   *
   *
   * Exemplo de uso:
   *
   * this.form = fb.group({
   *   'info':  ['', Validators.compose([Validators.required, ValidationUtil.notOnlyWhitespaces])],
   * });
   */
  static notOnlyWhitespaces(control: FormControl): ValidationResult {
    const text: String = String(control.value) || '';

    const isValid = !text || text.trim().length !== 0;

    return isValid ? null : { 'onlywhitespace': true };
  }

  /**
   * Invalida o campo caso seja detectado espaços
   * no início ou no final do valor inserido
   *
   * NÃO SUBSITUI A NECESSIDADE DE Validators.required
   *
   *
   * Exemplo de uso:
   *
   * this.form = fb.group({
   *   'info':  ['', Validators.compose([Validators.required, ValidationUtil.noWhitespace])],
   * });
   */
  static noWhitespace(control: FormControl): ValidationResult {
    if (typeof control.value !== 'string') {
      return null;
    }
    const isValid = (control.value || '').trim().length === (control.value || '').length;

    return isValid ? null : { 'haswhitespace': true };
  }

  /**
   * Validações usando expressão regular
   *
   * NÃO SUBSITUI NECESSIDADE DE Validators.required
   * NÃO SUBSITUI NECESSIDADE DE Validators.noWhitespaces
   *
   *
   * Exemplo de uso:
   *
   * this.form = this.fb.group({
   *   'km_inicial':  ['', Validators.compose([ValidationUtil.isKm, Validators.required])],
   *   'nome':  ['', ValidationUtil.isName],
   *   'telefone':  ['', ValidationUtil.isTelOrCel],
   *   'cpf': ['', ValidationUtil.isInteger]
   * });
   */

  static isKm(control: FormControl): ValidationResult {
    return ValidationUtil.regexArterisKm.test(control.value) ? null : { 'wrongformat': true };
  }

  static isMeter(control: FormControl): ValidationResult {
    return ValidationUtil.regexArterisMetro.test(control.value) ? null : { 'wrongformat': true };
  }

  static isCep(control: FormControl): ValidationResult {
    return ValidationUtil.regexCEP.test(control.value) ? null : { 'wrongformat': true };
  }

  static isNumber(control: FormControl): ValidationResult {
    return isNaN(control.value) ? { 'numberValidation': true } : null;
  }

  static isPositiveInteger(control: FormControl): ValidationResult {
    return ValidationUtil.regexNumeroInteiro.test(control.value) ? null : { 'wrongformat': true };
  }

  static isPositiveDecimal(control: FormControl): ValidationResult {
    return ValidationUtil.regexNumeroDecimal.test(control.value) ? null : { 'wrongformat': true };
  }

  static isPercentage(control: FormControl): ValidationResult {
    return ValidationUtil.regexPorcentagem.test(control.value) ? null : { 'wrongformat': true };
  }

  static isTelOrCel(control: FormControl): ValidationResult {
    return ValidationUtil.regexTelOuCel.test(control.value) ? null : { 'wrongformat': true };
  }

  static isEmail(control: FormControl): ValidationResult {
    return ValidationUtil.regexEmail.test(control.value) ? null : { 'wrongformat': true };
  }

  static isName(control: FormControl): ValidationResult {
    return ValidationUtil.regexNome.test(control.value) ? null : { 'wrongformat': true };
  }

  static isNameAndNumber(control: FormControl): ValidationResult {
    return ValidationUtil.regexNomeENumero.test(control.value) ? null : { 'wrongformat': true };
  }

  static isText(control: FormControl): ValidationResult {
    return ValidationUtil.regexTexto.test(control.value) ? null : { 'wrongformat': true };
  }


  static isProcess(control: FormControl): ValidationResult {
    return ValidationUtil.regexProcesso.test(control.value) ? null : { 'wrongformat': true };
  }


  static isFolha(control: FormControl): ValidationResult {
    const value = control.value || '';
    return value === '' || ValidationUtil.regexFolha.test(control.value) ? null : { 'wrongformat': true };
  }


  /**
   * Latitude e Longitude em graus decimais
   */
  static isLatitudeGD(control: FormControl): ValidationResult {
    return ValidationUtil.regexLatitudeGD.test(control.value) ? null : { 'wrongformat': true };
  }

  static isLongitudeGD(control: FormControl): ValidationResult {
    return ValidationUtil.regexLongitudeGD.test(control.value) ? null : { 'wrongformat': true };
  }


  /**
   * Latitude e Longitude em grau, minuto e segundo
   */
  static isLatitudeGMS(control: FormControl): ValidationResult {
    return ValidationUtil.regexLatitudeGMS.test(control.value) ? null : { 'wrongformat': true };
  }

  static isLongitudeGMS(control: FormControl): ValidationResult {
    return ValidationUtil.regexLongitudeGMS.test(control.value) ? null : { 'wrongformat': true };
  }


  /**
   * Coordenada UTM
   */
  static isNorthUTM(control: FormControl): ValidationResult {
    return ValidationUtil.regexNorteUTM.test(control.value) ? null : { 'wrongformat': true };
  }

  static isEastUTM(control: FormControl): ValidationResult {
    return ValidationUtil.regexLesteUTM.test(control.value) ? null : { 'wrongformat': true };
  }

  static isZoneUTM(control: FormControl): ValidationResult {
    return ValidationUtil.regexZonaUTM.test(control.value) ? null : { 'wrongformat': true };
  }

  static isLetterUTM(control: FormControl): ValidationResult {
    return ValidationUtil.regexLetraUTM.test(control.value) ? null : { 'wrongformat': true };
  }


  /**
   * Recebe as configurações do form e retorna
   * apenas os valores padrão. Útil para resetar o formulário.
   *
   * Exemplo de uso:
   *
   * Supondo que this.defauts sejam os controles do form
   * this.form = this.fb.group(this.defaults);
   * ...
   * this.form.reset(ValidationUtil.defaultValues(this.defaults));
   */
  static defaultValues(controlsConfig: Object): Object {
    const defaultValues = {};

    Object.keys(controlsConfig).map((key) => {
      const value = controlsConfig[key];
      defaultValues[key] = Array.isArray(value) ? value[0] : value;
    });

    return defaultValues;
  }


}
