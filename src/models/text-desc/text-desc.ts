import {Desc} from "../_index";

export class TextDesc extends Desc {
  private text: string;
  private style: TextStyle;

  constructor(text: string, style: TextStyle) {
    super();
    this.text = text;
    this.style = style ? style : TextStyle.Normal;
  }

  public getText(): string {
    return this.text;
  }

  public getStyle(): TextStyle {
    return this.style;
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

  public static fromObject(obj: any): TextDesc {
    if (!obj.text) {
      throw new Error("A text description must have <text>");
    }
    return new TextDesc(obj.text, TextStyle.fromString(obj.style));
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

  public getHtmlClass(): string {
    return this.name;
  }

  public static fromString(str: string): TextStyle {
    switch (str) {
      case "weak": return TextStyle.Weak;
      case "strong": return TextStyle.Strong;
      default: return TextStyle.Normal;
    }
  }
}
