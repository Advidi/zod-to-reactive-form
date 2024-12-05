import {z} from 'zod';
import {DeepDisabled, ZodFormArray} from '../types';
import {FormArray} from '@angular/forms';
import {createFormGroup} from './create-form-group';
import {createFormControl} from './create-form-control';

export interface FormArrayOptions<TSchema extends z.ZodArray<z.ZodTypeAny>> {
  value?: Partial<z.output<TSchema>>;
  disabled?: DeepDisabled<z.output<TSchema>>;
}

export function createFormArray<TSchema extends z.ZodArray<z.ZodTypeAny>>(schema: TSchema, options?: FormArrayOptions<TSchema>): ZodFormArray<TSchema> {
  const formArray = new FormArray<any>([]);
  const element = schema.element;

  options?.value?.forEach((value, index) => {
    const disabled = options?.disabled?.[index];

    formArray.push(
      element instanceof z.ZodObject
        ? createFormGroup(element, { value, disabled })
        : element instanceof z.ZodArray
          ? createFormArray(element, { value, disabled: disabled as any })
          : createFormControl(element, { value, disabled: disabled as boolean})
    )
  })

  return formArray as unknown as ZodFormArray<TSchema>;
}
