interface TokenTypesType {
  [key: string]: TokenType;

  OpeningParen: TokenType;
  ClosingParen: TokenType;
  Quote: TokenType;
  Colon: TokenType;
  Dollar: TokenType;
  At: TokenType;
  Alphanumeric: TokenType;
  Whitespace: TokenType;
  Identifier: TokenType;
  Indentation: TokenType;
  Attribute: TokenType;
}

type TokenType = {
  validate?: (str: string) => boolean;
  convert?: (token: Token) => void;
} | undefined;

interface Token {
  value: string;
  type: TokenType;
}
