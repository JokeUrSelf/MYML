import { isAlphabetic, isAlphanumeric, isWhitespace } from "@src/charCheck.ts";

const indentation = 2;

type TokenType = {
  validate?: (str: string) => boolean;
  convert?: (token: Token) => void;
} | undefined;

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
  OpeningParen: { validate: (chr) => chr === "(" },
  ClosingParen: { validate: (chr) => chr === ")" },
  Quote: { validate: (chr) => chr === '"' },
  Colon: { validate: (chr) => chr === ":" },
  Dollar: { validate: (chr) => chr === "$" },
  At: { validate: (chr) => chr === "@" },
  Alphanumeric: { validate: isAlphanumeric },
  Whitespace: { validate: isWhitespace },

  Depth: {
    convert: (token) => {
      if (token.type !== TokenTypes.Whitespace) return;
      token.type = undefined

      for (let i = token.value.length - 1; i >= 0; i--) {
        if (!"\n\r".includes(token.value[i])) continue;

        token.value = `${(token.value.length - 1 - i) / indentation >> 0}`;
        token.type = TokenTypes.Depth;
      }
    },
  },

  Identifier: {
    convert: (token) =>
      token.type === TokenTypes.Alphanumeric &&
      isAlphabetic(token.value[0]) &&
      (token.type = TokenTypes.Identifier),
  },
} as Record<string, TokenType>;

interface Token {
  value: string;
  type: TokenType;
}

function typeOf(chr: string): TokenType {
  for (const key in TokenTypes) {
    const type = TokenTypes[key];

    if (type?.validate && type.validate(chr)) return type;
  }

  console.error(`Unexpected character code: ${chr}`);
  return undefined;
}

function convert(token: Token): Token {
  for (const key in TokenTypes) {
    const type = TokenTypes[key];

    type?.convert && type.convert(token);
  }

  return token;
}

export function tokenize(sourceCode: string) {
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

    const token = convert({
      value: value.join(""),
      type: tokenType,
    });

    token.type && tokens.push(token);
  }

  return tokens;
}
