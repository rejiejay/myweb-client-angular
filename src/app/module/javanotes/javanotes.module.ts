import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JavaNotesComponent } from './javanotes.component';
import { JavaNotesRoutingModule } from './javanotes.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [JavaNotesComponent],
  imports: [
    CommonModule,
    FormsModule,

    JavaNotesRoutingModule
  ]
})
export class JavaNotesModule { }
