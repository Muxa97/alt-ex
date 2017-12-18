import { Injectable } from '@angular/core';
import { GrammarModel, Rule, Symbol } from '../models/grammar.model';

@Injectable()
export class InputGrammarService {
  G = new GrammarModel({});

  epsilonRules: Array<Rule>;
  nongeneratingSymbols: Array<string>;
  unreachableSymbols: Array<string>;
  reachableSymbols: Array<Symbol>;

  constructor() {
    this.epsilonRules = [];
    this.nongeneratingSymbols = [];
    this.unreachableSymbols = [];
  }

  addTerminal(val: string): void {
    if (this.G !== undefined && this.G && val !== '' && val !== null && this.G.terminalSymbols.indexOf(new Symbol(val)) === -1) {
      this.G.terminalSymbols.push(new Symbol(val));
    }
  }

  outputTerminals(): string {
    let str = '';
    const l = this.G.terminalSymbols.length;
    for (let i = 0; i < l - 1; i++) {
      str += ' ' + this.G.terminalSymbols[i] + ', ';
    }

    if (l !== 0) {
      str += this.G.terminalSymbols[l - 1];
    }

    return str;
  }

  addNonterminal(val: string): void {
    if (this.G !== undefined && this.G && val !== '' && val !== null && this.G.nonterminalSymbols.indexOf(new Symbol(val)) === -1) {
      this.G.nonterminalSymbols.push(new Symbol(val));
    }
  }

  outputNonterminals(): string {
    let str = '';
    const l = this.G.nonterminalSymbols.length;
    for (let i = 0; i < l - 1; i++) {
      str += ' ' + this.G.nonterminalSymbols[i] + ', ';
    }

    if (l !== 0) {
      str += this.G.nonterminalSymbols[l - 1];
    }

    return str;
  }

  addInitialSymbol(S: string): boolean {
    if (this.G.nonterminalSymbols.indexOf(new Symbol(S)) !== -1) {
      this.G.initialSymbol = new Symbol(S);
      return true;
    } else {
      return false;
    }
  }

  addRule(lft: string, rgh: string): void {
    if (lft !== '' && lft !== undefined) {

      if (this.CheckNonterminal(lft) && this.CheckRghPart(rgh)) {

        if (rgh === null || rgh === '' || rgh === undefined) {
          rgh = '\u03B5';
          this.epsilonRules.push(new Rule(lft, rgh));
        }

        let f = false;
        const l = this.G.inferenceRules.length;

        for (let i = 0; i < l; i++) {
          if (this.G.inferenceRules[i].leftPart.symbol === lft) {
            // this.G.inferenceRules[i].rightPart.push(new Symbol(rgh));
            f = true;
          }
        }

        if (!f) {
          this.G.inferenceRules.push(new Rule(lft, rgh));
        }
      }
    }
  }

  CheckNonterminal(nonterminal: string): boolean {
    return (this.G.nonterminalSymbols.indexOf(new Symbol(nonterminal)) !== -1) ? (true) : (false);
  }

  CheckRghPart(str: string): boolean {
    for (const s of this.G.terminalSymbols) {
      while (str.includes(s.symbol)) {
        str = str.replace(s.symbol, '');
      }
    }

    for (const s of this.G.nonterminalSymbols) {
      while (str.includes(s.symbol)) {
        str = str.replace(s.symbol, '');
      }
    }

    return (str === '') ? (true) : (false);
  }

  outputRules(): string {
    let str = '';
    const l = this.G.inferenceRules.length;

    for (let i = 0; i < l - 1; i++) {
      str += ' ' + this.G.inferenceRules[i].leftPart + ' → ';
      const k = this.G.inferenceRules[i].rightPart.length;
      for (let j = 0; j < k - 1; j++) {
        str += this.G.inferenceRules[i].rightPart[j] + ' | ';
      }
      if (k !== 0) {
        str += this.G.inferenceRules[i].rightPart[k - 1];
      }
      str += ', ';
    }

    if (l !== 0) {
      str += ' ' + this.G.inferenceRules[l - 1].leftPart + ' → ';
      const k = this.G.inferenceRules[l - 1].rightPart.length;
      for (let j = 0; j < k - 1; j++) {
        str += this.G.inferenceRules[l - 1].rightPart[j] + ' | ';
      }
      if (k !== 0) {
        str += this.G.inferenceRules[l - 1].rightPart[k - 1];
      }
    }

    return str;
  }

  removeUselessSymbols(): any {
    this.reachableSymbols.push(this.G.initialSymbol);
    this.removeNonGeneratingSymbols();
    this.removeUnreachableSymbols();
  }

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

  removeEpsilonRules(): void {
    for (const epsilon of this.epsilonRules) { }
  }
}
