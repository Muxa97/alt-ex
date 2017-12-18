import { Injectable } from '@angular/core';
import { GrammarModel, Rule } from '../models/grammar.model';

@Injectable()
export class InputGrammarService {
  G = new GrammarModel({});

  epsilonRules: Array<Rule>;
  nongeneratingSymbols: Array<string>;
  unreachableSymbols: Array<string>;
  generatingSymbols: Array<string>;
  reachableSymbols: Array<string>;

  constructor() {
    this.epsilonRules = [];
    this.nongeneratingSymbols = [];
    this.unreachableSymbols = [];
  }

  addTerminal(val: string): void {
    if (this.G !== undefined && this.G && val !== '' && val !== null && this.G.terminalSymbols.indexOf(val) === -1) {
      this.G.terminalSymbols.push(new Symbol(val);
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
    if (this.G !== undefined && this.G && val !== '' && val !== null && this.G.nonterminalSymbols.indexOf(val) === -1) {
      this.G.nonterminalSymbols.push(val);
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
    if (this.G.nonterminalSymbols.indexOf(S) !== -1) {
      this.G.initialSymbol = S;
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
          if (this.G.inferenceRules[i].leftPart === lft) {
            this.G.inferenceRules[i].rightPart.push(rgh);
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
    return (this.G.nonterminalSymbols.indexOf(nonterminal) !== -1) ? (true) : (false);
  }

  CheckRghPart(str: string): boolean {
    for (const s of this.G.terminalSymbols) {
      while (str.includes(s)) {
        str = str.replace(s, '');
      }
    }

    for (const s of this.G.nonterminalSymbols) {
      while (str.includes(s)) {
        str = str.replace(s, '');
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
    for (const X of this.G.nonterminalSymbols) {
      if (!this.IsGenerating(X)) {
        this.nongeneratingSymbols.push(X);
        this.removeSymbol(X);
      }
    }
  }

  IsGenerating(s: string): boolean {

  }

  removeSymbol(s: string): void {
    this.G.nonterminalSymbols = this.G.nonterminalSymbols.filter((symbol) => symbol !== s);
    this.G.inferenceRules = this.G.inferenceRules.filter((r) => r.leftPart !== s);

    for (const rule of this.G.inferenceRules) {
        rule.rightPart = rule.rightPart.filter((r) => !r.includes(s));
    }
  }

  removeUnreachableSymbols(): void {
    for (const X of this.G.nonterminalSymbols) {
      if (!this.IsReachable(X)) {
        this.unreachableSymbols.push(X);
        this.removeSymbol(X);
      }
    }
  }

  IsReachable(s: string): boolean {

  }

  removeEpsilonRules(): void {
    for (const epsilon of this.epsilonRules) { }
  }
}
