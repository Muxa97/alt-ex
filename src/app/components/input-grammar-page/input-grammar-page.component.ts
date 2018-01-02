import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { InputGrammarService } from '../../services/input-grammar.service';

@Component({
  selector: 'app-input-grammar-page',
  templateUrl: './input-grammar-page.component.html',
  styleUrls: ['./input-grammar-page.component.css']
})
export class InputGrammarPageComponent {
  grammarForm = new FormGroup({
    termSymbol: new FormControl(),
    nontermSymbol: new FormControl(),
    initialSymb: new FormControl(),
    leftPart: new FormControl(),
    rightPart: new FormControl()
  });

  inputTerminals: any;
  inputNonterminals: any;
  inputRules: any;

  constructor(public grammarService: InputGrammarService) { }

  addTerminal(): void {
    this.grammarService.addTerminal(this.grammarForm.controls.termSymbol.value);
    this.grammarForm.controls.termSymbol.setValue('');
  }

  addNonterminal(): void {
    this.grammarService.addNonterminal(this.grammarForm.controls.nontermSymbol.value);
    this.grammarForm.controls.nontermSymbol.setValue('');
  }

  addInitialS(): void {
    this.grammarService.addInitialSymbol(this.grammarForm.controls.initialSymb.value);
    this.grammarForm.controls.initialSymb.setValue('');
  }

  addRule(): void {
    this.grammarService.addRule(this.grammarForm.controls.leftPart.value, this.grammarForm.controls.rightPart.value);
    this.grammarForm.controls.leftPart.setValue('');
    this.grammarForm.controls.rightPart.setValue('');
  }

  Mark(): void {
    this.grammarService.MarkGeneratingSymbols();
    this.grammarService.MarkReachableSymbols();
    this.grammarService.IsEmpty();
    this.grammarService.IsInfinite();
  }
}
