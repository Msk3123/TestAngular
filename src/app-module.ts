import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TaskNoteComponent } from './task-note/task-note.component';
import { PlaygroundComponent } from './game/PlaygroundComponent';
import { A11yModule } from '@angular/cdk/a11y';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PlaygroundComponent, TaskNoteComponent],
  imports: [BrowserModule, CommonModule, MatSlideToggleModule, A11yModule],
  providers: [],
  bootstrap: [PlaygroundComponent],
  exports: [TaskNoteComponent],
})
export class AppModule {}
