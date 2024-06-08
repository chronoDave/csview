export default (x: string) => Array.from(x.matchAll(/(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g))
  .map(y => y[1]);
