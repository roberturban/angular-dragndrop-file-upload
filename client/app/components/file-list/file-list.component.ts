import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileListService } from '../../services/file-list.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileListComponent implements OnInit {

  private fileList = [];
  private isLoadingFileList = true;

  Math: any;

  private tableHeaders = [
    {name: "#"},
    {name: "File Name"},
    {name: "File Path on Server"},
    {name: "File Size [MB]"},
  ];

  constructor(
    private fileListService: FileListService
  ) {
    this.Math = Math;
  }

  ngOnInit() {
    this.fileListService.getFileList().subscribe(
      data => {
        this.fileList = data;
        this.isLoadingFileList = false;
      },
      error => console.log(error),
      () => console.log('File list loaded')
    );
  }


}
