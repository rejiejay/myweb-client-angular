import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JavaNotesComponent } from './javanotes.component';
import { JavaNotesRoutingModule } from './javanotes.routing';

@NgModule({
  declarations: [JavaNotesComponent],
  imports: [
    CommonModule,
    FormsModule,

    JavaNotesRoutingModule
  ]
})
export class JavaNotesModule { }
