import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {

  uploader = new Dropzone(‘#upload-widget’, options);

  constructor() { }

  ngOnInit() {

  }

}
