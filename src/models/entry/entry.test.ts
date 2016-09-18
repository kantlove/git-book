import { Entry, ImageDesc, TextDesc, TextStyle } from "../_index";
var assert = require("power-assert");

describe("Entry", function () {
  it("1 entry, 2 text desc, 1 image desc", function () {
    let input = {
      "title": "entry_parent",
      "desc": [
        {
          "text": "text desc 1",
          "style": "normal",
        },
        {
          "text": "comment",
          "style": "weak",
        },
        {
          "url": "http://www.w3schools.com/html/html5.gif",
        },
      ],
    };
    let entry = Entry.fromObject(input), desc = entry.getDescription();
    assert(entry.getTitle().getText() === input.title);
    assert(desc.length === 3);
    assert(desc[0] instanceof TextDesc && desc[1] instanceof TextDesc);
    assert(desc[2] instanceof ImageDesc);
  });

  it("invalid style of desc -> normal style desc", function () {
    let input = {
      "title": "entry_parent",
      "desc": [
        {
          "text": "text desc 1",
          "style": "normal",
        },
        {
          "text": "comment",
          "style": "invalid",
        },
        {
          "url": "http://www.w3schools.com/html/html5.gif",
        },
      ],
    };
    let entry = Entry.fromObject(input), desc = entry.getDescription();
    assert(desc[1] instanceof TextDesc);
    assert((desc[1] as TextDesc).getStyle() === TextStyle.Normal);
  });

  it("desc with no style -> normal style desc", function () {
    let input = {
      "title": "entry_parent",
      "desc": [
        {
          "text": "text desc 1",
          "style": "normal",
        },
        {
          "text": "comment",
        },
        {
          "url": "http://www.w3schools.com/html/html5.gif",
        },
      ],
    };
    let entry = Entry.fromObject(input), desc = entry.getDescription();
    assert(desc[1] instanceof TextDesc);
    assert((desc[1] as TextDesc).getStyle() === TextStyle.Normal);
  });

  it("invalid image desc -> error", function () {
    let input = {
      "title": "entry_parent",
      "desc": [
        {
          "text": "text desc 1",
          "style": "normal",
        },
        {
          "text": "comment",
          "style": "invalid",
        },
        {
          "urlxxx": "http://www.w3schools.com/html/html5.gif",
        },
      ],
    };
    try {
      Entry.fromObject(input);
      assert(false, "this operation must fail");
    }
    catch (e) {
      // ok
    }
  });

  it("invalid entry -> error", function () {
    let input = {
      "desc": [
        {
          "text": "text desc 1",
          "style": "normal",
        },
        {
          "text": "comment",
          "style": "invalid",
        },
        {
          "url": "http://www.w3schools.com/html/html5.gif",
        },
      ],
    };
    try {
      Entry.fromObject(input);
      assert(false, "this operation must fail");
    }
    catch (e) {
      // ok
    }
  });
});
