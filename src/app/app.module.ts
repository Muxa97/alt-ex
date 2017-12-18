import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { InputGrammarPageComponent } from './components/input-grammar-page/input-grammar-page.component';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { ExamplesPageComponent } from './components/examples-page/examples-page.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {InputGrammarService} from "./services/input-grammar.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskPageComponent,
    InputGrammarPageComponent,
    ResultPageComponent,
    ExamplesPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: TaskPageComponent
      },
      {
        path: 'input-grammar',
        component: InputGrammarPageComponent
      },
      {
        path: 'result',
        component: ResultPageComponent
      },
      {
        path: 'examples',
        component: ExamplesPageComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  providers: [InputGrammarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
