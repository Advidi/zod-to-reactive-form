import {z} from "zod";
import {FormControl} from "@angular/forms";
import {
  FieldOptions,
  GuardUndefined,
  ZodControl,
  ZodFormArray,
  ZodFormGroup
} from "../types";
import {createFormGroup} from "./create-form-group";
import {createFormArray} from "./create-form-array";
import {createFormControl} from "./create-form-control";

export function createZodControl<T extends z.SomeZodObject>(schema: T, options?: FieldOptions<z.infer<T>>): ZodFormGroup<T>;
export function createZodControl<T extends z.ZodArray<any>>(schema: T, options?: FieldOptions<z.infer<T>>): ZodFormArray<T>;
export function createZodControl<T extends z.ZodFirstPartySchemaTypes>(schema: T, options?: FieldOptions<z.infer<T>>): FormControl<GuardUndefined<z.infer<T>>>;
export function createZodControl<T extends z.ZodFirstPartySchemaTypes>(schema: T, options?: FieldOptions<z.infer<T>>): ZodControl<T> {
  if (schema instanceof z.ZodObject) {
    return createFormGroup(schema, options as any);
  } else if (schema instanceof z.ZodArray) {
    return createFormArray(schema, options as any);
  }

  return createFormControl(schema, options) as ZodControl<T>;
}
