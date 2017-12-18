import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGrammarPageComponent } from './input-grammar-page.component';

describe('InputGrammarPageComponent', () => {
  let component: InputGrammarPageComponent;
  let fixture: ComponentFixture<InputGrammarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputGrammarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGrammarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
