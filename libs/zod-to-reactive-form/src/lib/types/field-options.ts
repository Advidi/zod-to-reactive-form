import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {GeneratorOptions} from "./generator-options";

export interface FieldOptions<T> extends GeneratorOptions {
  value?: T;
  disabled?: boolean;
  validators?: ValidatorFn | ValidatorFn[] | null;
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}
