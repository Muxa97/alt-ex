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

export interface IRule {
  leftPart?: Symbol;
  rightPart?: Array<RightPart>;
}

export class Rule implements IRule {
  leftPart: Symbol;
  rightPart: Array<RightPart>;

  constructor (rule: IRule) {
    this.leftPart = rule.leftPart || new Symbol('');
    this.rightPart = rule.rightPart || [];
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
