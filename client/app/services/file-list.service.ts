import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileListService {

  constructor(
    private http: HttpClient
  ) { }

  getFileList(): Observable<any> {
    return this.http.get('/api/fileList');
  }
}
