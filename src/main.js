import { emailFormFactory } from './forms/emailForm';
import { ValidatedForm } from './validation/form';
import { ValidatedInput } from './validation/validation';
import style from './main.css';

const run = function () {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';

  const form = emailFormFactory();
  rootDiv.appendChild(form.render());

  const body = document.querySelector('body');
  body?.appendChild(rootDiv);
};

run();
