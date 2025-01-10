// @deno-types="@types/Token.d.ts"
import { assertEquals } from "jsr:@std/assert";
import { tokenize } from "@src/lexer.ts";
import { TokenTypes } from "@src/TokenTypes.ts";

const sample1 = `
Box
  Box
    Box
Box
Box
`

const sample2 = `
Box
  Box
  attr1: "val"
    Box
Box
Box
`

Deno.test("Indentation validity", () => {
  assertEquals(
    tokenize(sample1).map((tk) => tk.value),
    ["Box", "[", "Box", "[", "Box", "]", "]", "Box", "Box"],
  );
});

Deno.test("Attributes should have the same indentation as their tag", () => {
  // is there a token of indentation type before 

  let prevToken : Token = {value: '', type: undefined}
  const tokens = tokenize(sample2)
  for (let i = 0; i < tokens.length; i++) {
    if (prevToken.type === TokenTypes.Indentation && tokens[0].type === TokenTypes.Attribute) {
      throw "Failed"
    }
    prevToken = tokens[0]
  }
});
