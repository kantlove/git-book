import { Entry, TextDesc } from "../../models/_index";
import { InputReader } from "../input-reader/input-reader";
import { Parser } from "./parser";
var assert = require("power-assert");

describe("Parser", function () {
  it("1 entry", function(done) {
    let input = `
      title: section 1
    `;
    InputReader.readText(input).then(
      (obj: any) => {
        let root = Parser.parse(obj);
        let children = root.getChildren();
        assert(children.length === 1);
        assert(children[0] instanceof Entry);
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it("2 entries", function (done) {
    let input = `
      -
        type: section
        title: section 1
      -
        type: section
        title: section 2
    `;
    InputReader.readText(input).then(
      (obj: any) => {
        let root = Parser.parse(obj);
        let children = root.getChildren();
        assert(children.length === 2);
        for (let child of children) {
          assert(child instanceof Entry);
        }
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it("1 entry, 1 child entry", function (done) {
    let input = `
      -
        title: section 1
        children:
          -
            title: 1st entry
    `;
    InputReader.readText(input).then(
      (obj: any) => {
        let root = Parser.parse(obj);
        let children = root.getChildren();
        assert(children.length === 1);
        assert(children[0] instanceof Entry);

        let sect = children[0] as Entry;
        let sectChildren = sect.getChildren();
        assert(sect.getTitle() === "section 1");
        assert(sectChildren.length === 1);
        assert(sectChildren[0] instanceof Entry);

        let entry = sectChildren[0] as Entry;
        assert(entry.getTitle() === "1st entry");

        done();
      }).catch((err) => {
        done(err);
      });
  });

  it("1 entry, 1 child entry, 2 desc", function (done) {
    let input = `
      -
        title: section 1
        children:
          -
            title: 1st entry
            desc:
              -
                text: a normal description
                style: normal
              -
                text: a comment
                style: weak
    `;
    InputReader.readText(input).then(
      (obj: any) => {
        let root = Parser.parse(obj);
        let children = root.getChildren();
        assert(children.length === 1);
        assert(children[0] instanceof Entry);

        let sect = children[0] as Entry;
        let sectChildren = sect.getChildren();
        assert(sect.getTitle() === "section 1");
        assert(sectChildren.length === 1);
        assert(sectChildren[0] instanceof Entry);

        let entry = sectChildren[0] as Entry;
        assert(entry.getTitle() === "1st entry");

        let desc = entry.getDescription();
        assert(desc.length === 2);
        assert(desc[0] instanceof TextDesc);
        assert(desc[1] instanceof TextDesc);

        done();
      }).catch((err) => {
        done(err);
      });
  });

  it("1 entry ∋ 1 entry ∋ 1 entry ", function (done) {
    let input = `
      -
        title: entry 1
        children:
          -
            title: entry 1.1
            children:
              -
                title: entry 1.1.1
    `;
    InputReader.readText(input).then(
      (obj: any) => {
        let root = Parser.parse(obj);
        type HasChildren = {
          getChildren(): any[];
        }
        let hasChildren: HasChildren = root;
        for (let i = 0; i < 3; ++i) {
          let children = hasChildren.getChildren();
          assert(children.length === 1);
          assert(children[0] instanceof Entry);
          hasChildren = children[0];
        }

        done();
      }).catch((err) => {
        done(err);
      });
  });
});
