export interface IGrammar {
  terminalSymbols?: Array<Symbol>;
  nonterminalSymbols?: Array<Symbol>;
  inferenceRules?: Array<Rule>;
  initialSymbol?: Symbol;
}

export class GrammarModel implements IGrammar {
  terminalSymbols: Array<Symbol>;
  nonterminalSymbols: Array<Symbol>;
  inferenceRules: Array<Rule>;
  initialSymbol: Symbol;

  constructor(gr: IGrammar) {
    this.terminalSymbols = gr.terminalSymbols || [];
    this.nonterminalSymbols = gr.nonterminalSymbols || [];
    this.inferenceRules = gr.inferenceRules || [];
    this.initialSymbol = gr.initialSymbol || new Symbol('');
  }
}

export class Rule {
  leftPart: Symbol;
  rightPart: Array<RightPart>;

  constructor (lft: string, rgh: string) {
    this.leftPart = new Symbol(lft);

    if (this.rightPart === undefined) {
      this.rightPart = [];
    }
  }
}

export class Symbol {
  symbol: string;
  isReachable: boolean;
  isGenerating: boolean;

  constructor(s: string) {
    this.symbol = s;
    this.isGenerating = false;
    this.isReachable = false;
  }
}

export class RightPart {
  rgh: Array<Symbol>;

  constructor() {
    this.rgh = [];
  }
}
