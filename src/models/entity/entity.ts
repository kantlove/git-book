export abstract class Entity {
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
