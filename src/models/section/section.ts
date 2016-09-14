import { TypeHelper } from "../../helpers/_index";
import { Entity } from "../entity/entity";
import { Entry } from "../entry/entry";

export class Section extends Entity {
  private title: string;
  private children: Entity[];

  constructor(title: string, children: Entity[]) {
    super();
    this.title = title;
    this.children = children ? children : [];
  }

  public getTitle(): string {
    return this.title;
  }

  public getChildren(): Entity[] {
    return this.children;
  }

  public getHtmlClass(): string {
    return "sec";
  }

  public toHtml(): string {
    let innerHtml = "";
    for (let child of this.children) {
      innerHtml += child.toHtml();
    }
    return `
      <div class=${this.getHtmlClass()}>
        <div class="title">${this.title}</div>
        ${innerHtml}
      </div>
    `;
  }

  public static fromObject(obj: any): Section {
    if (!obj.title) {
      throw new Error("A section must have <title>");
    }
    let children = [];
    if (obj.children && TypeHelper.isArray(obj.children)) {
      for (let child of obj.children) {
        children.push(Entry.fromObject(child));
      }
    }
    return new Section(obj.title, children);
  }
}
