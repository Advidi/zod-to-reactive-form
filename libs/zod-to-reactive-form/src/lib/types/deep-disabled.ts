export type DeepDisabled<T> = T extends object
  ? { [P in keyof T]?: DeepDisabled<T[P]> }
  : T extends Array<infer U>
    ? Array<DeepDisabled<U>>
    : boolean
