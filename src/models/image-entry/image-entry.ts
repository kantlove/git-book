import {Desc} from "../desc/desc";
import {Entity} from "../entity/entity";

export class ImageEntry extends Entity {
  private url: string;
  private description: Desc[];
  private children: Entity[];

  constructor(url: string, description: Desc[], children: Entity[]) {
    super();
    this.url = url;
    this.description = description;
    this.children = children;
  }

  public getHtmlClass(): string {
    return "img-ent";
  }

  public toHtml(): string {
    let fullDescription = "";
    let innerHtml = "";

    for (let d of this.description) {
      fullDescription += d.toHtml();
    }
    for (let child of this.children) {
      innerHtml += child.toHtml();
    }

    return `
      <div class=${this.getHtmlClass()}>
        <div class="image">
          <img src=${this.url}>
        </div>
        <div class="description">${fullDescription}</div>
        ${innerHtml}
      </div>
    `;
  }
}
