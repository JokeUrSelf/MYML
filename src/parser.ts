import {
  isAlphanumeric,
  isClosingSign,
  isSign,
  isWhitespace,
} from "@src/charCheck.ts";

type TokenType = { validate: (str: string) => boolean };

// type Scope = object;

// const Scopes = {
//   ImportsInvocation: {},
//   ArgumentsInitialization: {},
//   TagInitialization: {},

//   ArgumentDeclaration: {},
//   ArgumentInvocation: {},
//   ArgumentDefinition: {},

//   TagNameInvocation: {},
//   TagArguments: {},

//   TagChildDeclaration: {},
//   TagChildInvocation: {},
//   TagChildDefinition: {},

//   AttributeDeclaration: {},
//   AttributeDefinition: {},
// };

const TokenTypes = {
  Whitespace: { validate: isWhitespace },
  Alphanumeric: { validate: isAlphanumeric },
  Sign: { validate: isSign },
  ClosingSign: { validate: isClosingSign },
} as Record<string, TokenType>;

interface Token {
  value: string;
  tokenType: TokenType;
}

function typeOf(str: string): TokenType {
  for (const key in TokenTypes) {
    const type = TokenTypes[key];

    if (type.validate(str)) return type;
  }

  throw `Unexpected character code: ${str}`;
}

export function tokenize(sourceCode: string) {
  const tokens = [] as Token[];

  for (let i = 0; i < sourceCode.length; i++) {
    const value = [sourceCode[i++]];
    const tokenType = typeOf(value[0]);

    while (i < sourceCode.length) {
      if (tokenType !== typeOf(sourceCode[i])) { i--; break; }

      value.push(sourceCode[i++]);
    }

    tokens.push({ value: value.join(""), tokenType });
  }

  return tokens;
}
