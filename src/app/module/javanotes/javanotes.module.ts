import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { JavaNotesComponent } from './javanotes.component';
import { JavaNotesRoutingModule } from './javanotes.routing';

@NgModule({
  declarations: [JavaNotesComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularEditorModule,

    JavaNotesRoutingModule
  ]
})
export class JavaNotesModule { }
