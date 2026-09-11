import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpacesValidator(control: AbstractControl): ValidationErrors | null {
  const text = control.value;

  if (typeof text !== 'string' || text.length === 0) {
    return null;
  }

  if (text.includes(' ')) {
    return { noSpaces: true };
  }

  return null;
}

export const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmpassword = control.get('confirmPassword')?.value;

  if (typeof password !== 'string' || typeof confirmpassword !== 'string') {
    return null;
  }

  if (password !== confirmpassword) {
    return {
      passwordMismatch: true,
    };
  }

  return null;
};
