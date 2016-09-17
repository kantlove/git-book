import { TypeHelper } from "../../helpers/_index";
import { Desc, Entity, ImageDesc, TextDesc} from "../_index";

export class Entry extends Entity {
  private title: string;
  private description: Desc[];
  private children: Entry[];

  constructor(title: string, description: Desc[], children: Entry[]) {
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

  public getChildren(): Entry[] {
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
        allDesc.push(Entry.descFromObject(desc));
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

  private static descFromObject(obj: any): Desc {
    try {
      try {
        return TextDesc.fromObject(obj);
      }
      catch (innerErr) {
        return ImageDesc.fromObject(obj);
      }
    }
    catch (e) {
      throw e;
    }
  }
}
