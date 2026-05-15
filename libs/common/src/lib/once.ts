export class Once {
  private done: Set<string>;

  constructor() {
    this.done = new Set();
  }

  when(condition: boolean): Once {
    if (condition) {
      return this;
    }

    return new DoNothing();
  }

  do(id: string, fn: () => void): void {
    if (!this.done.has(id)) {
      this.done.add(id);
      fn();
    }
  }
}

class DoNothing extends Once {
  override do(id: string, fn: () => void): void {
    return;
  }
}
