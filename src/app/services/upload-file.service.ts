import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { FileElement } from '../files/model/element';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', environment.uploadFileUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(environment.getFilesUrl);
  }

  // custom file upload handler
  uploadFolder(folder: FileElement): Observable<any> {
    return this.http.post(environment.uploadFolderUrl, FileElement);
  }

  uploadFile(directory: string, file:File) {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', environment.uploadFileUrl + "/" + directory, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFilesCustom(root : string): Observable<any> {
    return this.http.get(environment.getFilesUrl + "/" + root);
  }
}
