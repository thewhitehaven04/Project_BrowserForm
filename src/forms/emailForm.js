import { ValidatedForm } from '../validation/form';
import { COUNTRIES_ENUM } from '../validation/inputs/country/countriesEnum';
import { ValidatedCountry } from '../validation/inputs/country/country';
import { ValidatedEmail } from '../validation/inputs/mail/mail';
import { ValidatedPassword } from '../validation/inputs/password/password';

const PATTERN =
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$';

export const emailFormFactory = function () {
  return new ValidatedForm([
    new ValidatedEmail(),
    new ValidatedCountry(COUNTRIES_ENUM),
    new ValidatedPassword({ minlength: 8, pattern: PATTERN }),
  ]);
};
