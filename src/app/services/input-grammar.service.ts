import { Injectable } from '@angular/core';
import { GrammarModel, Rule, Symbol } from '../models/grammar.model';

@Injectable()
export class InputGrammarService {
  G: GrammarModel;

  constructor() {
    this.G = new GrammarModel({});
  }

  addTerminal(val: string): void {
    if (val !== '' && val !== undefined && val !== null) {
      let f = true;

      for (const t of this.G.terminalSymbols) {
        if (t.symbol === val) {
          f = false;
          break;
        }
      }

      if (f) {
        this.G.terminalSymbols.push(new Symbol(val));
      }
    }
  }

  outputTerminals(): string {
    let str = '';
    let i = 0;
    for (const term of this.G.terminalSymbols) {
      str += ' ' + term.symbol + ((++i === this.G.terminalSymbols.length) ? (' ') : (','));
    }

    return str;
  }

  addNonterminal(val: string): void {
    if (val !== '' && val !== undefined && val !== null) {
      let f = true;

      for (const t of this.G.nonterminalSymbols) {
        if (t.symbol === val) {
          f = false;
          break;
        }
      }

      if (f) {
        this.G.nonterminalSymbols.push(new Symbol(val));
      }
    }
  }

  outputNonterminals(): string {
    let str = '';
    let i = 0;
    for (const term of this.G.nonterminalSymbols) {
      str += ' ' + term.symbol + ((++i === this.G.nonterminalSymbols.length) ? (' ') : (','));
    }

    return str;
  }

  addInitialSymbol(S: string): boolean {
    for (const s of this.G.nonterminalSymbols) {
      if (s.symbol === S) {
        this.G.initialSymbol = new Symbol(S);
        return true;
      }
    }

    return false;
  }

  addRule(lft: string, rgh: string): void {
    let f = false;
    for (const r of this.G.inferenceRules) {
      if (r.leftPart.symbol === lft && this.strToSymbolArray(rgh).length !== 0) {
        r.rightPart.push({rgh: this.strToSymbolArray(rgh)});
        f = true;
        break;
      }
    }
    if (!f && this.CheckNonterminal(lft) && this.strToSymbolArray(rgh).length !== 0) {
      this.G.inferenceRules.push( { leftPart: new Symbol(lft),
                                    rightPart: [ {rgh: this.strToSymbolArray(rgh)} ] } );
    }
  }

  strToSymbolArray(s: string): Array<Symbol> {
    let r: Array<Symbol>;
    r = [];
    while (s !== '') {
      let f = false;

      for (const symb of this.G.terminalSymbols) {
        if (s.startsWith(symb.symbol)) {
          r.push(symb);
          s = s.replace(symb.symbol, '');
          f = true;
          break;
        }
      }
      if (!f) {
        for (const symb of this.G.nonterminalSymbols) {
          if (s.startsWith(symb.symbol)) {
            r.push(symb);
            s = s.replace(symb.symbol, '');
            f = true;
            break;
          }
        }
      }

      if (!f) {
        r = [];
        return r;
      }
    }

    return r;
  }

  CheckNonterminal(nonterminal: string): boolean {
    for (const s of this.G.nonterminalSymbols) {
      if (s.symbol === nonterminal) {
        return true;
      }
    }
    return false;
  }

  outputRules(): string {
    let str = '';
    let i = 0;
    for (const r of this.G.inferenceRules) {
      str += r.leftPart.symbol + ' → ';
      let j = 0;
      for (const rgh of r.rightPart) {
        for (const s of rgh.rgh) {
          str += s.symbol;
        }
        str += ((++j === r.rightPart.length) ? (' ') : (' | '));
      }
      str += ((++i === this.G.inferenceRules.length) ? (' ') : (', '));
    }

    return str;
  }

  removeUselessSymbols(): any { }

  removeNonGeneratingSymbols(): void {
  }

  IsGenerating(s: string): boolean {
    return true;
  }

  removeSymbol(s: string): void {

  }

  removeUnreachableSymbols(): void {

  }

  IsReachable(s: string): boolean {
    return true;
  }

  removeEpsilonRules(): void { }
}
