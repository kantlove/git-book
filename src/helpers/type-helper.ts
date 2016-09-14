export class TypeHelper {
  public static isNumber(obj: any): obj is number {
    return typeof obj === "number";
  }

  public static isString(obj: any): obj is string {
    return typeof obj === "string";
  }

  public static isArray(obj: any): obj is any[] {
    return obj instanceof Array;
  }
}
