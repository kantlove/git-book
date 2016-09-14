export abstract class Entity {
  public static fromObject(obj: any): Entity {
    throw "fromObject must be overriden";
  }

  protected id: string;

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public abstract getHtmlClass(): string;

  public abstract toHtml(): string;
}
