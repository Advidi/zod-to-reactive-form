import {createFormGroup} from '../create-form-group';
import {z} from 'zod';
import {FormControl, FormGroup} from '@angular/forms';
import {createFormControl} from "../create-form-control";

describe('createFormGroup', () => {
  it('should create a FormGroup', () => {
    const control = createFormGroup(z.object({
      name: z.string(),
      age: z.number(),
    }));

    expect(control.controls.name).toBeInstanceOf(FormControl);
    expect(control.controls.age).toBeInstanceOf(FormControl);
  })

  it('should create a FormGroup with default values', () => {
    const control = createFormGroup(z.object({
      name: z.string(),
      age: z.number(),
    }), {
      name: createFormControl(z.string(), {value: 'John'}),
      age: createFormControl(z.number(), {value: 30}),
    });

    expect(control.controls.name.value).toEqual('John');
    expect(control.controls.age.value).toEqual(30);
  })

  it('should create a FormGroup with disabled controls', () => {
    const control = createFormGroup(z.object({
      name: z.string(),
      age: z.number(),
    }), {
      name: createFormControl(z.string(), {disabled: true}),
      age: createFormControl(z.number(), {disabled: true}),
    });

    expect(control.controls.name.disabled).toBeTruthy();
    expect(control.controls.age.disabled).toBeTruthy();
  })

  it('should create a nested FormGroup', () => {
    const control = createFormGroup(z.object({
      name: z.string(),
      address: z.object({
        city: z.string(),
        street: z.string(),
      }),
    }));

    expect(control.controls.address).toBeInstanceOf(FormGroup);
    expect(control.controls.address.controls.city).toBeInstanceOf(FormControl);
    expect(control.controls.address.controls.street).toBeInstanceOf(FormControl);
  })

  it('should create a nested FormGroup with default values', () => {
    const control = createFormGroup(z.object({
      name: z.string(),
      address: z.object({
        city: z.string(),
        street: z.string(),
      }),
    }), {
      address: createFormGroup(z.object({
        city: z.string(),
        street: z.string(),
      }), {
        city: createFormControl(z.string(), {value: 'New York'}),
        street: createFormControl(z.string(), {value: '5th Avenue'})
      })
    });

    expect(control.controls.address.controls.city.value).toEqual('New York');
    expect(control.controls.address.controls.street.value).toEqual('5th Avenue');
  })

  it('should create a nested FormGroup with disabled controls', () => {
    const control = createFormGroup(z.object({
      name: z.string(),
      address: z.object({
        city: z.string(),
        street: z.string(),
      }),
    }), {
      address: createFormGroup(z.object({
        city: z.string(),
        street: z.string(),
      }), {
        city: createFormControl(z.string(), {disabled: true}),
        street: createFormControl(z.string(), {disabled: true})
      })
    });

    expect(control.controls.address.controls.city.disabled).toBeTruthy();
    expect(control.controls.address.controls.street.disabled).toBeTruthy();
  })
})
