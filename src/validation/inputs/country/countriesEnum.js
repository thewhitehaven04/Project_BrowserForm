/**
 * @typedef {Object} CountryDto
 * @property {String} name
 * @property {String} displayName
 */

/**
 * A list of supported countries
 * @readonly
 * @enum {CountryDto}
 */
export const COUNTRIES_ENUM = [
  {
    name: 'uk',
    displayName: 'United Kingdom',
  },
  {
    name: 'au',
    displayName: 'Australia',
  },
  {
    name: 'ru',
    displayName: 'Russia',
  },
];
