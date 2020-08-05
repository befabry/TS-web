import { ModelAttributes } from "./Model";

export class Attributes<T> implements ModelAttributes<T> {
  constructor(private data: T) {}

  //Look up the correspond key string value we pass, and return the corresponding type
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  getAll(): T {
    return this.data;
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
