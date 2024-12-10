import {z} from "zod";
import {FormControl} from "@angular/forms";
import {
  GuardUndefined,
  ZodControl,
  ZodFormArray,
  ZodFormGroup
} from "../types";
import {createFormGroup} from "./create-form-group";
import {createFormArray} from "./create-form-array";
import {createFormControl} from "./create-form-control";

export function createZodControl<T extends z.SomeZodObject>(schema: T): ZodFormGroup<T>;
export function createZodControl<T extends z.ZodArray<any>>(schema: T): ZodFormArray<T>;
export function createZodControl<T extends z.ZodFirstPartySchemaTypes>(schema: T): FormControl<GuardUndefined<z.infer<T>>>;
export function createZodControl<T extends z.ZodFirstPartySchemaTypes>(schema: T): ZodControl<T> {
  if (schema instanceof z.ZodObject) {
    return createFormGroup(schema);
  } else if (schema instanceof z.ZodArray) {
    return createFormArray(schema);
  }

  return createFormControl(schema) as ZodControl<T>;
}
