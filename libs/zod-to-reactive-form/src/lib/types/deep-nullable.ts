export type DeepNullable<T> = T extends object
  ? { [P in keyof T]?: DeepNullable<T[P]> | null }
  : T | null;
