import { Injectable } from '@angular/core';
import {GrammarModel, RightPart, Symbol, Rule} from '../models/grammar.model';

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
        const s = new Symbol(val);
        s.isTerminal = true;
        this.G.terminalSymbols.push(s);
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
        s.isReachable = true;
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
      this.G.inferenceRules.push( { leftPart: new Symbol(lft), rightPart: [ {rgh: this.strToSymbolArray(rgh)} ] } );
    }
  }

  strToSymbolArray(s: string): Array<Symbol> {
    let r: Array<Symbol>;
    r = [];
    if (s === '' || !s) {
      r.push(new Symbol('\u03b5'));
      return r;
    }
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

  MarkGeneratingSymbols(): void {
    while (this.SetGeneratingSymbols()) {}
    this.RemoveNonGeneratingSymbols();
  }

  SetGeneratingSymbols(): boolean {
    let changed = false;

    for (const S of this.G.nonterminalSymbols) {
      if (this.IsGenerating(S)) {
        S.isGenerating = true;
        changed = true;
      }
    }

    return changed;
  }

  IsGenerating(s: Symbol): boolean {
    if (s.isGenerating) {
      return false;
    }

    let isGen = false;

    for (const r of this.G.inferenceRules) {
      if (r.leftPart.symbol === s.symbol) {
        for (const rghPart of r.rightPart) {
          isGen = true;
          for (const symb of rghPart.rgh) {
            isGen = isGen && (symb.isGenerating || symb.isTerminal);
            if (isGen === false) {
              break;
            }
          }
          if (isGen) {
            return true;
          }
        }
      }
    }

    return isGen;
  }

  RemoveNonGeneratingSymbols(): void {
    for (const s of this.G.nonterminalSymbols) {
      if (!s.isGenerating) {
        this.G.nonterminalSymbols = this.G.nonterminalSymbols.filter((symb) => symb.symbol !== s.symbol);
        this.G.inferenceRules = this.G.inferenceRules.filter((rule) => rule.leftPart.symbol !== s.symbol);
        for (const rule of this.G.inferenceRules) {
          rule.rightPart = rule.rightPart.filter((rP) => !this.contains(rP, s));
        }
      }
    }
  }

  contains(rP: RightPart, s: Symbol): boolean {
    for (const symb of rP.rgh) {
      if (symb.symbol === s.symbol) {
        return true;
      }
    }
    return false;
  }

  MarkReachableSymbols(): void {
    while (this.SetReachableSymbols()) {}
    this.RemoveUnreachableSymbols();
  }

  SetReachableSymbols(): boolean {
    let changed = false;

    for (const r of this.G.inferenceRules) {
      for (const l of this.G.nonterminalSymbols) {
        if (l.symbol === r.leftPart.symbol && l.isReachable) {
          r.leftPart.isReachable = true;
        }
      }
      if (r.leftPart.isReachable) {
        for (const rP of r.rightPart) {
          for (const s of rP.rgh) {
            if (!s.isReachable) {
              changed = true;
              s.isReachable = true;
              for (const nonterm of this.G.nonterminalSymbols) {
                if (nonterm.symbol === s.symbol) {
                  nonterm.isReachable = true;
                }
              }
              for (const term of this.G.terminalSymbols) {
                if (term.symbol === s.symbol) {
                  term.isReachable = true;
                }
              }
            }
          }
        }
      }
    }

    return changed;
  }

  RemoveUnreachableSymbols(): void {
    for (const s of this.G.nonterminalSymbols) {
      if (!s.isReachable) {
        this.G.nonterminalSymbols = this.G.nonterminalSymbols.filter((symb) => symb.symbol !== s.symbol);
        this.G.inferenceRules = this.G.inferenceRules.filter((rule) => rule.leftPart.symbol !== s.symbol);
        for (const rule of this.G.inferenceRules) {
          rule.rightPart = rule.rightPart.filter((rP) => !this.contains(rP, s));
        }
      }
    }

    for (const s of this.G.terminalSymbols) {
      if (!s.isReachable) {
        this.G.terminalSymbols = this.G.terminalSymbols.filter((symb) => symb.symbol !== s.symbol);
        for (const rule of this.G.inferenceRules) {
          rule.rightPart = rule.rightPart.filter((rP) => !this.contains(rP, s));
        }
      }
    }
  }

  IsEmpty(): void {
    for (const r of this.G.inferenceRules) {
      for (const rightPart of r.rightPart) {
        for (const s of rightPart.rgh) {
          if (s.symbol !== '\u03b5') {
            alert('Язык не пустой');
            return;
          }
        }
      }
    }
    alert('Язык пустой');
  }

  IsInfinite(): void {
    for (const rule of this.G.inferenceRules) {
      const wasUsed = [];
      wasUsed.push(rule.leftPart);
      for (const rp of rule.rightPart) {
        if (this.CheckInference(wasUsed, rp)) {
          alert('Язык бесконечен');
          return;
        }
      }
    }
    alert('Язык конечен');
  }

  CheckInference(wasUsed: Array<Symbol>, rp: RightPart): boolean {
    for (const symb of rp.rgh) {
      for (const s of wasUsed) {
        if (s.symbol === symb.symbol) {
          return true;
        }
      }

      for (const s of rp.rgh) {
        if (!s.isTerminal) {
          for (const rule of this.G.inferenceRules) {
            if (rule.leftPart.symbol === s.symbol) {
              wasUsed.push(s);
              for (const rightPart of rule.rightPart) {
                if (this.CheckInference(wasUsed, rightPart)) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  }

  /*RemoveEpsilonRules(): void {
    for (const rule of this.G.inferenceRules) {
      for (const rp of rule.rightPart) {
        if (rp.rgh[0].symbol === '\u03b5') {
          this.ReplaceSymbolToEpsilon(rule.leftPart);
          rule.rightPart = rule.rightPart.filter((rgh) => rgh.rgh[0].symbol !== '\u03b5');
        }
      }
    }
  }

  ReplaceSymbolToEpsilon(s: Symbol): void {
    for (const rule of this.G.inferenceRules) {
      for (const rp of rule.rightPart) {

      }
    }
  }*/
}
