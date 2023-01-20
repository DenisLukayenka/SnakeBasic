import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardComponent } from '../board/board.component';
import { CellComponent } from '../cell/cell.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
