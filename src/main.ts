import { tokenize } from "@src/lexer.ts";
const filePath = "example/file.myml";
const sourceCode = Deno.readTextFileSync(filePath);

console.log(tokenize(sourceCode));
