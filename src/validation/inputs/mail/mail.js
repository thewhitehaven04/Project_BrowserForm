import style from './../input.css';

/**
 * @class
 * @implements {import('./../../validation.js').ValidatedInput}
 */
export class ValidatedEmail {
  divRoot = document.createElement('div');
  /**
   * @type {HTMLLabelElement}
   */
  label = document.createElement('label');
  input = document.createElement('input');
  spanErrorMsg = document.createElement('span');

  validate() {
    if (this.input.validity.valid) {
      return {
        success: true,
        validationMsg: null,
      };
    }
    return {
      success: false,
      validationMsg:
        'The email field should be filled like the following: test@email.com',
    };
  }

  reset() {
    this.spanErrorMsg.textContent = '';
    this.spanErrorMsg.classList.remove(...this.spanErrorMsg.classList);
  }

  render() {
    const ID = 'email';
    this.divRoot.classList.add('form-input');

    this.label.textContent = 'E-Mail:';
    this.label.setAttribute('for', ID);

    this.input.type = 'email';
    this.input.required = true;
    this.input.id = ID;

    this.spanErrorMsg.classList.add('error');

    this.input.addEventListener('input', (event) => {
      const validation = this.validate();
      if (validation.success !== true) {
        this.spanErrorMsg.textContent = validation.validationMsg;
        this.spanErrorMsg.classList.add('validation-error');
      } else {
        this.spanErrorMsg.textContent = '';
      }
    });

    this.divRoot.append(...[this.label, this.input, this.spanErrorMsg]);
    return this.divRoot;
  }
}
