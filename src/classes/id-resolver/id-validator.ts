export class IdValidator {
  /**
   * A valid HTML id:
   *  - must contain at least 1 character
   *  - must not have space
   * Throws error if @id does not satisfy the conditions above.
   * @param id  id to be validated.
   */
  public static validate(id: string) {
    if (id.search("[a-zA-Z]") < 0) {
      throw new Error("id must contain at least 1 character");
    }
    if (id.indexOf(" ") >= 0) {
      throw new Error("id must not contain any space");
    }
  }
}
