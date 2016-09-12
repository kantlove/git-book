import {Entity} from "../entity/entity";

export class Reference extends Entity {
  private targetId: string;
  private text: string;

  constructor(targetId: string, text: string) {
    super();
    this.targetId = targetId;
    this.text = text;
  }

  public getHtmlClass(): string {
    return "ref";
  }

  public toHtml(): string {
    return `<a href=#${this.targetId}>${this.text}</a>`;
  }
}
