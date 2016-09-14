import Promise from "ts-promise";
// import Promise = require("promise");
var yaml = require("js-yaml");
var fs = require("fs-extra");

export class InputReader {
  public static readFile(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let content = fs.readFileSync(filePath, "utf8");
        let obj = yaml.safeLoad(content);
        resolve(obj);
      }
      catch (e) {
        reject(e);
      }
    });
  }

  public static readText(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let obj = yaml.safeLoad(text);
        resolve(obj);
      }
      catch (e) {
        reject(e);
      }
    });
  }
}
