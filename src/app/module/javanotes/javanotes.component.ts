import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { JavaNotesService } from './javanotes.service';

@Component({
  selector: 'app-javanotes',
  templateUrl: './javanotes.component.html',
  styleUrls: ['./javanotes.component.less']
})
export class JavaNotesComponent implements OnInit {
  constructor(public storage: JavaNotesService, public location: Location) {
  }

  ngOnInit() {
  }
}
