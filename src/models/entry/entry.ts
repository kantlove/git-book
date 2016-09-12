import {Desc} from "../desc/desc";
import {Entity} from "../entity/entity";

export class Entry extends Entity {
  private title: string;
  private description: Desc[];
  private children: Entity[];

  constructor(title: string, description: Desc[], children: Entity[]) {
    super();
    this.title = title;
    this.description = description;
    this.children = children;
  }

  public getHtmlClass(): string {
    return "ent";
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
        <div class="title">${this.title}</div>
        <div class="description">${fullDescription}</div>
        ${innerHtml}
      </div>
    `;
  }
}
