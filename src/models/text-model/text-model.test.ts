import { IdResolver } from "../../classes/_index";
import { TextModel } from "../_index";
var assert = require("power-assert");

describe("TextModel", function () {
  beforeEach(function () {
    IdResolver.reset();
  });

  it("Ref text with space -> ok", function () {
    let input = "this is ref [chapter 1](chap-1)";
    let expect = "this is ref <a href=\"#chap-1\">chapter 1</a>";

    let model = TextModel.fromString(input);
    assert(model.toHtml() === expect);
  });

  it("Ref text with space and newline -> ok", function () {
    let input = `this is ref [chapter 1
      in 2 lines](chap-1)`;
    let expect = "this is ref <a href=\"#chap-1\">chapter 1 in 2 lines</a>";

    let model = TextModel.fromString(input);
    assert(model.toHtml() === expect);
  });

  it("Ref id with space -> error", function () {
    let input = `this is ref [chapter 1](chap- 1)`;

    try {
      TextModel.fromString(input);
      assert(false, "this operation should fail");
    }
    catch (e) {
      // ok
    }
  });

  it("Ref id with newline -> error", function () {
    let input = `this is ref [chapter 1](chap-
      1)`;

    try {
      TextModel.fromString(input);
      assert(false, "this operation should fail");
    }
    catch (e) {
      // ok
    }
  });

  it("Ref with duplicate id -> error", function () {
    let input = `this is ref [chap 1](one) and [chap 2](one)`;

    try {
      TextModel.fromString(input);
      assert(false, "this operation should fail");
    }
    catch (e) {
      // ok
    }
  });

  it("Incomplete ref -> text", function () {
    let input = [
      "this is ref [chap 1](chap-1",
      "this is ref [chap 1](",
      "this is ref [chap 1]",
      "this is ref [cha",
    ];
    let expect = input;

    for (let i = 0; i < input.length; ++i) {
      let model = TextModel.fromString(input[i]);
      assert(model.toHtml() === expect[i]);
    }
  });

  it("Ref with empty or whitespace text -> error", function () {
    let input = [
      "this is ref [chapt 1]()",
      "this is ref [chapt 2](    )",
    ];

    for (let i = 0; i < input.length; ++i) {
      try {
       TextModel.fromString(input[i]);
       assert(false, "this operation should fail");
      }
      catch (e) {
        // ok
      }
    }
  });

  it("Ref with empty or whitespace id -> error", function () {
    let input = [
      "this is ref [](abc)",
      "this is ref [  ](abc)",
    ];

    for (let i = 0; i < input.length; ++i) {
      try {
       TextModel.fromString(input[i]);
       assert(false, "this operation should fail");
      }
      catch (e) {
        // ok
      }
    }
  });

  it("ref between text -> ok", function () {
    let input = `this is ref [a](b) and [c](d). Lets
      have another [e](f)! How about [g](h)?`;
    let expect = `this is ref <a href=\"#b\">a</a> and <a href=\"#d\">c</a>. Lets
      have another <a href=\"#f\">e</a>! How about <a href=\"#h\">g</a>?`;

    let model = TextModel.fromString(input);
    assert(model.toHtml() === expect);
  });
});
