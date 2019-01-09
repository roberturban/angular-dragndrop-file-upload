import { Component, ElementRef, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';


@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {

  /* Workaround for multiple drag events due to File List*/
  private dragTarget = null;
  private dragged = false;
  private updateFileList = false;

  /* Upload UI states */
  private fileLoading = false;
  private successfulUpload = false;
  private openUploadModal = false;
  private errorMessage = false;
  private uploadModalMinified = true;

  @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;

  constructor(){ }

  public config: DropzoneConfigInterface = {
    createImageThumbnails: false,
    paramName: "file",
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    previewsContainer: "#dropzone-file-previews",
    clickable: "#dropzone-upload-button",
    previewTemplate: `
    <div class="dz-preview dz-file-preview">
      <div class="dz-details">
        <div class="dz-filename"><span data-dz-name></span></div>
      </div>
      <div class="dz-icons">
        <div id="dz-spinner" class="dz-progress">
          <i class="fa fa-circle-o-notch fa-spin"></i>
        </div>
        <div id="dz-success" class="dz-success-mark">
          <i class="fa fa-check"></i>
        </div>
      </div>
      <div id="dz-error-group">
        <div id="dz-error" class="dz-error-mark">
          <i class="fa fa-exclamation-circle"></i>
        </div>
        <div id="dz-error-message" class="dz-error-message"><span data-dz-errormessage></span></div>
      </div>
    </div>
  `,
    cancelReset: null
  };

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
    this.openUploadModal = true;
    this.fileLoading = true;
    if (this.dragTarget === event.target) {
      event.stopPropagation();
      event.preventDefault();
      this.dragged = false;
    }

  }

  public onUploadSuccess(args: any): void {
    this.updateFileList = !this.updateFileList;
    this.successfulUpload = true;
    // REFACTOR: Ugly workaound as Angular Bindings are not working with PreviewTemplate
    document.getElementById('dz-spinner').style.display="none";
    document.getElementById('dz-success').style.display="block";
  }

  public onUploadError(file, message){
    this.errorMessage = true;
    var errorNode = document.getElementById('dz-error-group');
    if(errorNode){
      document.getElementById('dz-spinner').style.display="none";
      document.getElementById('dz-error-group').style.display="block";
    }
  }


  public onFileAdded(args: any): void {
    this.onDropped(true);
  }

  public closeModal(){
    // TODO: If two files dropped, check that other file is not still loading
    if (this.successfulUpload || this.errorMessage ){
      this.resetUIstate();
      this.directiveRef.reset();
    }
  }

  public minifyUploadModal(){
    this.uploadModalMinified = !this.uploadModalMinified;
  }

  public resetUIstate(){
    this.fileLoading = false;
    this.errorMessage = false;
    this.successfulUpload = false;
    this.openUploadModal = false;
    this.uploadModalMinified = true;
  }


}
