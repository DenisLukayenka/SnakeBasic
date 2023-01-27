import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';

import { AppComponent } from './app/app.component';
import { ModalComponent } from './modals/modal/modal.component';
import { GameOverModalComponent } from './modals/gameover/gameover.component';
import { PauseModalComponent } from './modals/pause/pause.component';
import { TimePipe } from 'src/pipes/time.pipe';
import { WinModalComponent } from './modals/win/win.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BoardComponent,
    ModalComponent,
    GameOverModalComponent,
    PauseModalComponent,
    TimePipe,
    WinModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
