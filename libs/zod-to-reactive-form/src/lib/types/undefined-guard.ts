import {NonUndefinable} from './non-undefinable';

export type GuardUndefined<T> = T extends undefined ? NonUndefinable<T> | null : T;
