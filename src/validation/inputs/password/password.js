import style from './../input.css';

/**
 * @typedef {Object} PasswordConstraintsDto
 * @property {String} pattern the pattern to perform user-input password testing against
 * @property {number} minlength the minimal number of characters for the password
 */

/**
 * @class
 * @implements {import('./../../validation.js').ValidatedInput}
 */
export class ValidatedPassword {
  divRoot = document.createElement('div');
  labelPass = document.createElement('label');
  labelConfirm = document.createElement('label');
  inputPass = document.createElement('input');
  inputConfirm = document.createElement('input');
  spanError = document.createElement('span');

  /**
   *
   * @param {PasswordConstraintsDto} passwordProps
   */
  constructor(passwordProps) {
    this.props = passwordProps;
  }

  #applyConstraints() {
    [this.inputPass, this.inputConfirm].forEach((pass) => {
      pass.type = 'password';
      pass.pattern = this.props.pattern;
      pass.minLength = this.props.minlength;
    });
  }

  /**
   * Perform validation
   * @return {import('../../validation').ValidationDto}
   */
  validate() {
    if (this.inputPass.value !== this.inputConfirm.value) {
      return {
        success: false,
        validationMsg: "The passwords don't match",
      };
    } else if (this.inputPass.validity.tooShort) {
      return {
        success: false,
        validationMsg: `The password is too short. The password must at least be ${this.props.minlength} characters long!`,
      };
    }
    return {
      success: true,
      validationMsg: null,
    };
  }

  reset() {
    this.inputPass.value = '';
    this.inputConfirm.value = '';
  }

  render() {
    this.divRoot.classList.add('form-pass-grid');

    this.labelPass.style.gridArea = 'labelpass';
    this.labelConfirm.style.gridArea = 'labelconfirm';
    this.inputPass.style.gridArea = 'pass';
    this.inputConfirm.style.gridArea = 'confirm';
    this.spanError.style.gridArea = 'error';

    this.inputPass.required = true;
    this.inputConfirm.required = true;

    this.labelPass.textContent = 'Password:';
    this.labelConfirm.textContent = 'Confirm:';

    this.spanError.classList.add('error');

    this.#applyConstraints();

    [this.inputPass, this.inputConfirm].forEach((input) =>
      input.addEventListener('focusout', (event) => {
        const validation = this.validate();
        if (validation.success !== true) {
          this.spanError.textContent = validation.validationMsg;
          this.spanError.classList.remove('validation-success');
          this.spanError.classList.add('validation-error');
        } else {
          this.spanError.textContent = '';
          this.spanError.classList.remove('validation-error');
          this.spanError.classList.add('validation-success');
        }
      }),
    );

    this.divRoot.append(
      ...[
        this.labelPass,
        this.labelConfirm,
        this.inputPass,
        this.inputConfirm,
        this.spanError,
      ],
    );
    return this.divRoot;
  }
}
