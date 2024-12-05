import {z} from 'zod';

export type UnwrapLazyType<T> = T extends z.ZodLazy<infer TLazy> ? TLazy : T;
