import { isAlphabetic, isAlphanumeric, isWhitespace } from "@src/charCheck.ts";

export const TokenTypes = {
  OpeningParen : { validate: (chr) => chr === "(" },
  ClosingParen : { validate: (chr) => chr === ")" },
  Quote        : { validate: (chr) => chr === '"' },
  Colon        : { validate: (chr) => chr === ":" },
  Dollar       : { validate: (chr) => chr === "$" },
  At           : { validate: (chr) => chr === "@" },
  Alphanumeric : { validate: isAlphanumeric },
  Whitespace   : { validate: isWhitespace },
  Indentation  : { validate: chr=>"[]".includes(chr) },
  Attribute    : {},
  
  Identifier : {
    convert: (token) =>
      token.type === TokenTypes.Alphanumeric &&
      isAlphabetic(token.value[0]) &&
      (token.type = TokenTypes.Identifier),
  },
} as TokenTypesType;
