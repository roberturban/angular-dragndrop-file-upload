import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Dropzone from 'dropzone';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {

  private dropzone: Dropzone;

  constructor() {
  }

  ngOnInit() {

  }

}
