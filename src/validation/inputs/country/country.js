import style from './../input.css';

/**
 * @class
 * @implements {import('./../../validation.js').ValidatedInput}
 */
export class ValidatedCountry {
  divRoot = document.createElement('div');
  label = document.createElement('label');
  input = document.createElement('input');
  datalist = document.createElement('datalist');
  spanErrorMsg = document.createElement('span');

  /**
   * @param {import('./countriesEnum').CountryDto[]} countries
   */
  constructor(countries) {
    this.countryList = countries;
  }

  /**
   * Renders an option for the countries datalist
   * @param {import('./countriesEnum').CountryDto} countryDto
   * @returns {HTMLOptionElement}
   */
  #renderOption(countryDto) {
    const option = document.createElement('option');
    option.value = countryDto.displayName;
    return option;
  }

  /**)
   * Perform validation
   * @return {import('../../validation').ValidationDto}
   */
  validate() {
    if (
      !this.countryList.find(
        (country) => country.displayName === this.input.value,
      )
    ) {
      return {
        success: false,
        validationMsg:
          'The country must be one of those specified in the dropdown list',
      };
    }
    return {
      success: true,
      validationMsg: null,
    };
  }

  reset() {
    this.spanErrorMsg.textContent = '';
    this.spanErrorMsg.classList.remove(...this.spanErrorMsg.classList);
  }

  render() {
    const ID = 'country';
    const datalistId = 'countries';

    this.divRoot.classList.add('form-input');

    this.label.setAttribute('for', ID);
    this.label.textContent = 'Country:';

    this.input.type = 'text';
    this.input.required = true;
    this.input.setAttribute('list', datalistId);
    this.input.id = ID;

    this.spanErrorMsg.classList.add('error');

    this.datalist.append(
      ...this.countryList.map((country) => this.#renderOption(country)),
    );
    this.datalist.id = datalistId;

    this.input.addEventListener('focusout', (event) => {
      const validation = this.validate();
      if (validation.success !== true) {
        this.spanErrorMsg.textContent = validation.validationMsg;
        this.spanErrorMsg.classList.add('validation-error');
      } else {
        this.spanErrorMsg.textContent = '';
        this.spanErrorMsg.classList.remove('validation-error');
      }
    });

    this.divRoot.append(
      ...[this.label, this.input, this.datalist, this.spanErrorMsg],
    );
    return this.divRoot;
  }
}
