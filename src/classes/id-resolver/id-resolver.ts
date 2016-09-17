import {IdValidator} from "../_index";

export class IdResolver {
  private static map: string[];

  /**
   * Transforms @id to be usable in HTML. Throws error
   * if @id is invalid.
   * @param id  id to be resolved.
   */
  public static resolve(id: string): string {
    let fixedId = IdResolver.fix(id);
    IdValidator.validate(fixedId);
    if (IdResolver.isDuplicate(fixedId)) {
      throw new Error("id must be unique");
    }

    IdResolver.map.push(fixedId);
    return fixedId;
  }

  /**
   * Clear the memory of resolved ids.
   */
  public static reset() {
    IdResolver.map = [];
  }

  private static fix(id: string): string {
    return encodeURI(id.toLowerCase());
  }

  private static isDuplicate(id: string): boolean {
    return IdResolver.map.indexOf(id) >= 0;
  }
}
