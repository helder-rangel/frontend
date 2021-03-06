import { AbstractControl, FormControl } from "@angular/forms";

export class Validations {
  static ValidaCpf(controle: AbstractControl) {
    const cpf = controle.value;

    let soma: number = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp("[0-9]{11}");

    if (
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999" ||
      !regex.test(cpf)
    )
      valido = false;
    else {
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) valido = false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) valido = false;
      valido = true;
    }

    if (valido) return null;

    return { cpfInvalido: true };
  }

  static passwordDoNotMatch(controle: AbstractControl) {
    let password = controle.get("password").value;
    let password_confirmation = controle.get("password_confirmation").value;

    if (password === password_confirmation) return null;

    controle
      .get("password_confirmation")
      .setErrors({ passwordDoNotMatch: true });
  }

  static cepValidator(control: AbstractControl) {
    const cep = control.value
    console.log(cep)
    console.log(control)
    if (cep && cep !== '') {
      const validateCep = /^\d{5}(-)?\d{3}$/
      // !validateCep.test(cep) && control
      //   .get('cep')
      //   .setErrors({ cepInvalido: true })
      !validateCep.test(cep) && control.setErrors({ cepInvalido: true })
      // return validateCep.test(cep) ? null : { cepInvalido: true }
    }
  }
}
