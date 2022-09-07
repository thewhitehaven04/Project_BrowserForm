import { ValidatedInput } from './validation';

/**
 * @implements {ValidatedInput}
 */
export class ValidatedForm {
  /**
   * @type {HTMLFormElement}
   */
  formRoot = document.createElement('form');
  /**
   * @type {HTMLFieldSetElement}
   */
  fieldset = document.createElement('fieldset');
  resetButton = document.createElement('button');
  submit = document.createElement('button');

  /**
   * @param {ValidatedInput[]} inputs
   */
  constructor(inputs) {
    this.inputs = inputs;
  }

  validate() {
    if (this.inputs.every((input) => input.validate().success === true)) {
      return {
        success: true,
        validationMsg: null,
      };
    }
    return {
      success: false,
      validationMsg: `The following fields are not formatted correctly: ${this.inputs.filter(
        (input) => input.validate().success !== true,
      )}`,
    };
  }

  reset() {
    this.inputs.forEach((input) => input.reset());
  }

  render() {
    this.formRoot.noValidate = true;

    this.submit.type = 'submit';
    this.submit.textContent = 'Submit';

    this.resetButton.type = 'reset';
    this.resetButton.textContent = 'Reset';
    this.resetButton.addEventListener('click', () => {
      this.reset();
    });

    this.fieldset.classList.add('fieldset-flex');
    this.fieldset.append(...this.inputs.map((input) => input.render()));

    this.fieldset.addEventListener('submit', (event) => {
      const validation = this.validate();
      if (!validation.success) {
        this.fieldset.setCustomValidity(validation.validationMsg);
        this.fieldset.reportValidity();
        this.formRoot.event.preventDefault();
      } else {
        this.fieldset.setCustomValidity('');
      }
    });
    this.formRoot.append(...[this.fieldset, this.resetButton, this.submit]);

    return this.formRoot;
  }
}
