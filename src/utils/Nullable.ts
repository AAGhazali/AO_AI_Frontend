export class Nullable<T> {
  constructor(public value: T | undefined) {}

  isNull(): boolean {
    return this.value === undefined;
  }

  isNotNull(): boolean {
    return this.value !== undefined;
  }

  getValue(): T {
    if (!this.value) {
      throw new Error("Value is null");
    }
    return this.value;
  }
}
