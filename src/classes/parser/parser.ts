import {RootEntry} from "../../models/_index";

export class Parser {
  public static parse(obj: any): RootEntry {
    return RootEntry.fromObject(obj);
  }
}
