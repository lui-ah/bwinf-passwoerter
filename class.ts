interface Filters {
  caseInsensitive: boolean;
  modify: string[][];
}

interface Filter {
  match?: RegExp;
  modifier?: "standart" | Filters;
}

export class Words {
  private W: string[];
  wordPool: string[];
  constructor(words: string[]) {
    this.wordPool = words;
    this.W = words;
  }
  applyFilter(options: Filter) {
    if (options.match)
      this.wordPool = this.W.filter(w => options.match.test(w));
    let filters: Filters;
    switch (options.modifier) {
      case undefined:
        break;
      case "standart":
        filters = {
          caseInsensitive: true,
          modify: [["a", "@"], ["e", "3"], ["o", "0"]]
        };
        break;
      default:
        filters = options.modifier;
        break;
    }

    if (filters)
      this.wordPool = this.wordPool.map(word => {
        filters.modify.forEach(toModify => {
          let [original, target] = toModify;
          word = word.replace(
            new RegExp(original, filters.caseInsensitive ? "gi" : "g"),
            target
          );
        });
        return word;
      });

    return this;
  }
  private get random() {
    return this.wordPool[Math.round(Math.random() * this.wordPool.length)];
  }
  randomString(len: number, i = 0, s = "") {
    return len === i ? s : this.randomString(len, i + 1, s + this.random);
  }
}
