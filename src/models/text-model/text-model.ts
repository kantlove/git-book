import { IdResolver } from "../../classes/_index";
import { HtmlRepresentable } from "../../common/_index";
import { TypeHelper } from "../../helpers/_index";
import { Reference } from "../_index";

export type Chunk = string | Reference;
type Token = {
  type: string,
  text: string
}
type RefParseResult = {
  id: string,
  text: string
}

/**
 * Returns tokens parsed from @str. A token can be used to
 * create a chunk.
 * @param str str to be parsed.
 */
function tokenize(str: string): Token[] {
  let tokens: Token[] = [];
  let n = str.length, left = "";
  for (let i = 0; i < n; ++i) {
    let c = str.charAt(i);
    if (c === "[") {
      tokens.push({ "type": "text", "text": left });
      left = "";
      // Go right to find ) then add [...) as a ref token
      let tmp = c, j = i + 1, endOfRefFlag = false;
      for (; j < n; ++j) {
        let cj = str.charAt(j);
        tmp += cj;
        if (cj === ")") {
          tokens.push({ "type": "ref", "text": tmp });
          endOfRefFlag = true;
          i = j;
          break;
        }
      }
      // If ) cannot be found, then treat this as a part of a text token.
      if (!endOfRefFlag) {
        left = tmp;
        i = j;
      }
    }
    else {
      left += c;
    }
  }
  // If @left is non-empty, it is a text token.
  if (left) {
    tokens.push({ "type": "text", "text": left });
  }
  return tokens;
}

function makeChunks(tokens: Token[]): Chunk[] {
  let chunks = [];
  for (let t of tokens) {
    if (t.type === "ref") {
      let rs = parseRefToken(t);
      // If @t is not a valid ref, treat it as a text token
      if (rs === undefined) {
        chunks.push(t.text);
      }
      else {
        let ref = new Reference(rs.id, rs.text);
        chunks.push(ref);
      }
    }
    else {
      chunks.push(t.text);
    }
  }
  return chunks;
}

/**
 * Returns id and text that can be used to make a Reference.
 * Returns undefined if @token is invalid.
 * @param token token to be parsed.
 */
function parseRefToken(token: Token): RefParseResult {
  let text = "", id = "";
  let s = token.text;
  let textLeft = 0, textRight = s.indexOf("]");
  // If @textRight not exist -> not a valid ref. Return undefined.
  if (textRight < 0) {
    return undefined;
  }
  text = s.substring(textLeft + 1, textRight);
  // Make sure @text is one line.
  text = text.replace(/(\r\n|\r|\n)\t*/g, " ").replace(/\s+/g, " ");

  let idLeft = textRight + 1, idRight = s.length - 1;
  // If char at @idLeft is not '(' or char at @idRight is not ')' -> not a valid ref. Return undefined.
  if (s.charAt(idLeft) !== "(" || s.charAt(idRight) !== ")") {
    return undefined;
  }
  id = s.substring(idLeft + 1, idRight);
  // Make sure @id can be used
  id = IdResolver.resolve(id);

  return { "id": id, "text": text };
}

function mergeAdjacentTextChunks(chunks: Chunk[]): Chunk[] {
  let n = chunks.length;
  let merged: Chunk[] = [], tmp = "";
  for (let i = 0; i < n; ++i) {
    let c = chunks[i];
    let next = (i < n) ? chunks[i + 1] : undefined;
    if (TypeHelper.isString(c)) {
      tmp += c;
      if (!TypeHelper.isString(next)) {
        merged.push(tmp);
        tmp = "";
      }
    }
    else {
      merged.push(c);
    }
  }
  return merged;
}

export class TextModel implements HtmlRepresentable {
  private text: string;
  private chunks: Chunk[];

  private constructor(text: string, chunks: Chunk[]) {
    this.text = text;
    this.chunks = chunks;
  }

  public getText(): string {
    return this.text;
  }

  public getChunks(): Chunk[] {
    return this.chunks;
  }

  public getHtmlClass(): string {
    throw new Error("There is no HTML class for this type.");
  }

  public toHtml(): string {
    let html = "";
    for (let c of this.chunks) {
      if (TypeHelper.isString(c)) {
        html += c;
      }
      else {
        html += c.toHtml();
      }
    }
    return html;
  }

  public static fromString(str: string): TextModel {
    if (!str) {
      return new TextModel("", []);
    }

    let tokens = tokenize(str);
    let chunks = makeChunks(tokens);
    chunks = mergeAdjacentTextChunks(chunks);

    return new TextModel(str, chunks);
  }
}
