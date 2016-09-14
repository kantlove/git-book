import {Entity} from "../entity/entity";

export class RootEntry extends Entity {
  private children: Entity[];

  constructor(children: Entity[]) {
    super();
    this.children = children;
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
}
