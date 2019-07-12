import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JavaNotesComponent } from './javanotes.component';

const routes: Routes = [
  { path: '', component: JavaNotesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JavaNotesRoutingModule { }
