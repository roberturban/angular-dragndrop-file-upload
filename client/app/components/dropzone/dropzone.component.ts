import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {

  // private uploader = new Dropzone('#upload-widget', {
  //
  // });

  constructor() { }

  ngOnInit() {

  }

}
