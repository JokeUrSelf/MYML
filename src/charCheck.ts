const ord = (chr: string) => chr.charCodeAt(0);

function between(start: number, value: number, end: number) {
  return start <= value && value <= end;
}

declare global {
  interface String {
    beetween(chr1: string, chr2: string): boolean;
  }
}

String.prototype.beetween = function (chr1: string, chr2: string) {
  return between(ord(chr1), ord(this as string), ord(chr2));
};

export function isAlphanumeric(chr: string): boolean {
  return chr.beetween("a", "z") ||
    chr.beetween("A", "Z") ||
    chr.beetween("0", "9");
}

export function isWhitespace(chr: string): boolean {
  return between(0, ord(chr), 32);
}

export function isSign(chr: string) {
  return "@$:".includes(chr);
}

export function isClosingSign(chr: string) {
  return '()"'.includes(chr);
}
