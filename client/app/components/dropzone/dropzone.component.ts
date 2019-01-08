import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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
  private fileLoading = true;
  private successfulUpload = false;
  private errorUpload = false;
  private openUploadModal = false;
  private uploadModalMinified = true;

  public config: DropzoneConfigInterface = {
    createImageThumbnails: false,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    previewsContainer: "#dropzone-file-previews",
    clickable: "#dropzone-upload-button",
    previewTemplate: `
      <div class="dz-preview dz-file-preview">
        <div class="dz-details">
          <div class="dz-filename"><span data-dz-name></span></div>
          <div class="dz-size" data-dz-size></div>
        </div>
        <div *ngIf="fileLoading" class="dz-progress">
          <fa name="close" animation="spin"></fa>
        </div>
        <div *ngIf="successfulUpload" class="dz-success-mark">
          <fa name="success"></fa>
        </div>
        <div *ngIf="errorUpload" class="dz-error-mark">
          <fa name="exclamation-circle"></fa>
        </div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
      </div>
    `,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;

  constructor(){}

  ngOnInit() {}

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
    if (this.dragTarget === event.target) {
      event.stopPropagation();
      event.preventDefault();
      this.dragged = false;
    }
  }

  public onUploadSuccess(args: any): void {
    this.updateFileList = !this.updateFileList;
    this.successfulUpload = true;
  }

  public onFileAdded(args: any): void {
    this.onDropped();
  }

  public closeModal(){
    if (this.successfulUpload){
        this.resetUIstate();
    }
  }

  public minifyUploadModal(){
    this.uploadModalMinified = !this.uploadModalMinified;
  }

  public resetUIstate(){
    this.fileLoading = true;
    this.successfulUpload = false;
    this.errorUpload = false;
    this.openUploadModal = false;
    this.uploadModalMinified = false;
  }


}
