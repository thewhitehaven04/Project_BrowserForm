/**
 * @typedef {Object} ValidationDto
 * @property {Boolean} success returns true if the input is successfully vallidated
 * @property {?String} validationMsg validation message to display if failed validation
 */

/**
 * @interface ValidatedInput
 * @property {Function} validate performs validation of the input
 * @property {Function} render renders the input
 */
function ValidatedInput() {}

/**
 * @method
 * @name ValidatedInput#validate
 * @returns {ValidationDto}
 */
ValidatedInput.prototype.validate = function () {
  return { success: true, validationMsg: '' };
};

/**
 * @method
 * @name ValidatedInput#render
 * @returns {HTMLElement}
 */
ValidatedInput.prototype.render = function () {
  return new HTMLInputElement();
};

/**
 * @method
 * @name ValidatedInput#reset
 */
ValidatedInput.prototype.reset = function () {};

export { ValidatedInput };
