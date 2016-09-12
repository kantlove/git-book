import {Entity} from "../entity/entity";

export class Desc extends Entity {
  private text: string;
  private style: TextStyle;

  constructor(text: string, style: TextStyle) {
    super();
    this.text = text;
    this.style = style;
  }

  public getHtmlClass(): string {
    return `desc-${this.style}`;
  }

  public toHtml(): string {
    return `
      <div class=${this.getHtmlClass()}>
        <p>${this.text}</p>
      </div>
    `;
  }
}

export class TextStyle {
  public static readonly Weak   = new TextStyle("w");
  public static readonly Normal = new TextStyle("n");
  public static readonly Strong = new TextStyle("s");

  private name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public toString(): string {
    return this.name;
  }
}
