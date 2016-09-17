import {Desc} from "../_index";

export class ImageDesc extends Desc {
  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public getUrl(): string {
    return this.url;
  }

  public getHtmlClass(): string {
    return "img-desc";
  }

  public toHtml(): string {
    return `
      <div class=${this.getHtmlClass()}>
        <div class="image">
          <img src=${this.url}>
        </div>
      </div>
    `;
  }

  public static fromObject(obj: any): ImageDesc {
    if (!obj.url) {
      throw new Error("An image description must have <url>");
    }
    return new ImageDesc(obj.url);
  }
}
