import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {

  private dragged = false;
  /* Workaround for multiple drag events due to File List*/
  private dragTarget = null;

  public config: DropzoneConfigInterface = {
    createImageThumbnails: false,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    previewsContainer: "#dropzone-file-previews",
    clickable: "#dropzone-upload-button",
    cancelReset: null
  };

  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;

  constructor(){
  }

  ngOnInit() {

  }


  public onDragEnter(args: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.dragTarget = event.target;
    this.dragged = true;
  }

  public onDragLeave(args: any): void {
    if (this.dragTarget === event.target) {
      event.stopPropagation();
      event.preventDefault();
      this.dragged = false;
    }
  }

  public onDropped(args: any): void {
    if (this.dragTarget === event.target) {
      event.stopPropagation();
      event.preventDefault();
      this.dragged = false;
    }
  }

  public onUploadSuccess(args: any): void {

  }


}
