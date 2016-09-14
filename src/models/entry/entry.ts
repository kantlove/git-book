import { TypeHelper } from "../../helpers/_index";
import { Desc } from "../desc/desc";
import { Entity } from "../entity/entity";

export class Entry extends Entity {
  private title: string;
  private description: Desc[];
  private children: Entity[];

  constructor(title: string, description: Desc[], children: Entity[]) {
    super();
    this.title = title;
    this.description = description ? description : [];
    this.children = children ? children : [];
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): Desc[] {
    return this.description;
  }

  public getChildren(): Entity[] {
    return this.children;
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

  public static fromObject(obj: any): Entry {
    if (!obj.title) {
      throw new Error("An entry must have <title>");
    }

    let allDesc = [];
    if (obj.desc && TypeHelper.isArray(obj.desc)) {
      for (let desc of obj.desc) {
        allDesc.push(Desc.fromObject(desc));
      }
    }

    let children = [];
    if (obj.children && TypeHelper.isArray(obj.children)) {
      for (let child of obj.children) {
        children.push(Entry.fromObject(child));
      }
    }
    return new Entry(obj.title, allDesc, children);
  }
}
