import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";

export interface FieldOptions<T> {
  value?: T;
  disabled?: boolean;
  validators?: ValidatorFn | ValidatorFn[] | null;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}
