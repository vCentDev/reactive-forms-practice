import { AbstractControl, ValidationErrors } from '@angular/forms';

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
