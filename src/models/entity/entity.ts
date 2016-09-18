import {HtmlRepresentable} from "../../common/_index";

export abstract class Entity implements HtmlRepresentable {
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
