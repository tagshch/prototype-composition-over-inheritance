export interface NamesTrait {

  name: string;
  type: string;

  assignName(usedNames: string[]): void;

  getNextName(params: {
    usedNames: Array<string>;
    type: string;
    prefix: string;
  }): string;
}


export class NamesTrait implements NamesTrait {

  public name: string;
  public type: string;

  constructor(public dto: any) {
    this.name = dto?.name || '';
    this.type = dto?.type || '';
  }

  /**
   * prefix - can be name of different interface
   */

  public setName(prefix: string, usedNames: string[]) {
    this.name = this.getNextName({
      prefix: prefix,
      usedNames,
      type: this.type,
    });
  }

  public getNextName(params: {
    prefix: string;
    usedNames: Array<string>;
    type: string;
  }): string {
    let counter = 0;

    const {
      prefix,
      type = '',
      usedNames = [],
    } = params;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const nextName = prefix + type + counter.toString();

      if (!usedNames.includes(nextName)) {
        return nextName;
      }

      counter += 1;
    }
  }
}
