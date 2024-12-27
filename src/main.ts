import { tokenize } from "@src/parser.ts";
const filePath = "example/file.myml";
const sourceCode = Deno.readTextFileSync(filePath);

console.log(tokenize(sourceCode));
