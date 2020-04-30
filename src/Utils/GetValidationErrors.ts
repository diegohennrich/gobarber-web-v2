import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function GetValidationErrors(err: ValidationError): Errors {
  const errorsGroup: Errors = {};

  err.inner.forEach((i) => {
    errorsGroup[i.path] = i.message;
  });

  return errorsGroup;
}
