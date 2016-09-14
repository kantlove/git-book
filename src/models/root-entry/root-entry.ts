import { TypeHelper } from "../../helpers/_index";
import { Entity } from "../entity/entity";
import { Section } from "../section/section";

export class RootEntry extends Entity {
  private children: Entity[];

  constructor(children: Entity[]) {
    super();
    this.children = children ? children : [];
  }

  public getChildren(): Entity[] {
    return this.children;
  }

  public getHtmlClass(): string {
    return "root-ent";
  }

  public toHtml(): string {
    let innerHtml = "";

    for (let child of this.children) {
      innerHtml += child.toHtml();
    }
    return `
      <div class=${this.getHtmlClass()}>
        ${innerHtml}
      </div>
    `;
  }

  public static fromObject(obj: any): RootEntry {
    let children = TypeHelper.isArray(obj) ? obj : [obj];
    for (let i = 0; i < children.length; ++i) {
      children[i] = Section.fromObject(children[i]);
    }
    return new RootEntry(children);
  }
}
