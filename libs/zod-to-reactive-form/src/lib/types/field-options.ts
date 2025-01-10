import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {GuardUndefined} from "./undefined-guard";

export interface FieldOptions<T> {
  value?: GuardUndefined<T>;
  disabled?: boolean;
  validators?: ValidatorFn | ValidatorFn[] | null;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}
