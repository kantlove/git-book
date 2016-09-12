import {Entity} from "../entity/entity";

export class Section extends Entity {
  private title: string;
  private children: Entity[];

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
}
