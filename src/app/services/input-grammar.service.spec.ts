import { TestBed, inject } from '@angular/core/testing';

import { InputGrammarService } from './input-grammar.service';

describe('InputGrammarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputGrammarService]
    });
  });

  it('should be created', inject([InputGrammarService], (service: InputGrammarService) => {
    expect(service).toBeTruthy();
  }));
});
