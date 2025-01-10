import { ast } from "@src/ast.ts";
import { tokenize } from "@src/lexer.ts";
const filePath = "example/file.myml";
const sourceCode = Deno.readTextFileSync(filePath);

tokenize(sourceCode)
