import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';

import { AppComponent } from './app/app.component';
import { ColorComponent } from './color/color.component';
import { ModalComponent } from './modals/modal/modal.component';
import { GameOverModalComponent } from './modals/gameover/gameover.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BoardComponent,
    ColorComponent,
    ModalComponent,
    GameOverModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
