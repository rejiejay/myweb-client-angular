import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { JavaNotesComponent } from './javanotes.component';
import { JavaNotesRoutingModule } from './javanotes.routing';

@NgModule({
  declarations: [JavaNotesComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularEditorModule,
    NzButtonModule,

    JavaNotesRoutingModule
  ]
})
export class JavaNotesModule { }
