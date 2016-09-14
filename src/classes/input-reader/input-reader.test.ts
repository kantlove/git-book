import {InputReader} from "./input-reader";

describe("Input Reader", function() {
  it("input yaml -> object", function(done) {
    let input = "./data/input.yml";
    InputReader.readFile(input).then(
      (obj: any) => {
        done();
      },
      (reason) => {
        done(reason);
      });
  });
});
