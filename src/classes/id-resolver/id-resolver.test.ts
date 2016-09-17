import { IdResolver } from "../_index";
var assert = require("power-assert");

describe("IdResolver", function () {
  it("hashtag, character -> ok", function () {
    let input = "#abc";
    try {
      IdResolver.resolve(input);
    }
    catch (e) {
      assert(e !== undefined, "this operation should succeed");
    }
  });

  it("no character -> error", function () {
    let input = "#@__";
    try {
      IdResolver.resolve(input);
      assert(false, "this operation should fail");
    }
    catch (e) {
      // ok
    }
  });

  it("number only -> error", function () {
    let input = "0123";
    try {
      IdResolver.resolve(input);
      assert(false, "this operation should fail");
    }
    catch (e) {
      // ok
    }
  });

  it("empty -> error", function () {
    let input = "";
    try {
      IdResolver.resolve(input);
      assert(false, "this operation should fail");
    }
    catch (e) {
      // ok
    }
  });

  it("whitespaces -> error", function () {
    let input = "    ";
    try {
      IdResolver.resolve(input);
      assert(false, "this operation should fail");
    }
    catch (e) {
      // ok
    }
  });

  it("symbols, numbers, and characters -> ok", function () {
    let input = "_one-two@3";
    try {
      IdResolver.resolve(input);
    }
    catch (e) {
      assert(e !== undefined, "this operation should succeed");
    }
  });
});
