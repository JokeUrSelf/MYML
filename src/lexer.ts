import { INDENT_LVL } from "@src/config.ts";
import { TokenTypes } from "@src/TokenTypes.ts";

function typeOf(chr: string): TokenType {
  for (const key in TokenTypes) {
    const type = TokenTypes[key];

    if (type?.validate && type.validate(chr)) return type;
  }

  console.error(`Unexpected character code: ${chr}`);
  return undefined;
}

function tokenizeRaw(sourceCode: string) {
  const tokens = [] as Token[];

  for (let i = 0; i < sourceCode.length; i++) {
    const value = [sourceCode[i++]];
    const tokenType = typeOf(value[0]);

    while (i < sourceCode.length) {
      if (tokenType !== typeOf(sourceCode[i])) {
        i--;
        break;
      }

      value.push(sourceCode[i++]);
    }

    tokens.push({
      value: value.join(""),
      type: tokenType,
    });
  }

  return tokens;
}

export function tokenize(sourceCode: string) {
  const tokens = tokenizeRaw(sourceCode);
  const refinedTokens = [];
  let depth = 0;
  let scoped = false;


  while (tokens.length > 0) {
    const token = tokens.shift();
    if (token === undefined) break;

    if (token.type === TokenTypes.OpeningParen) {
      scoped = true
    }
    
    if (token.type === TokenTypes.ClosingParen) {
      scoped = false
    }

    if (token.type === TokenTypes.Whitespace) {
      if (scoped) continue
      
      const indentation = token.value.lastIndexOf("\n") + 1;
      if (!indentation) continue;

      const currDepth = (token.value.length - indentation) / INDENT_LVL >> 0;

      for (let i = currDepth; i < depth; i++) {
        tokens.unshift({
          value: "]",
          type: TokenTypes.Indentation,
        });
      }

      if (currDepth > depth) {
        tokens.unshift({
          value: "[",
          type: TokenTypes.Indentation,
        });
      }

      depth = currDepth;
      continue;
    }

    refinedTokens.push(token);
  }

  return refinedTokens;
}
