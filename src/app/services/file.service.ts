import { Injectable } from '@angular/core';
import { FileElement } from '../files/model/element';
import { BehaviorSubject, Observable } from 'rxjs';
import { UploadFileService } from './upload-file.service';
import { User } from '../models';
import { AuthenticationService } from '.';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private map = new Map<string, FileElement>();
  public currentUser: any;
  
  constructor(private uploadFileService : UploadFileService, private authenticationService : AuthenticationService,) {
    this.authenticationService.currentUser
    .subscribe(x => {
      this.currentUser = x;
      // retrieve user file and folders from storage
      this.uploadFileService.getFilesCustom(this.currentUser.username)
      .subscribe((data : FileElement[]) => {
        data.forEach((el : FileElement) => {
          this.map.set(el.uuid, this.clone(el));
        });
      });
    });
  }

  addFolder(fileElement: FileElement) {
    // no uuid but backend will generate one for it.
    this.uploadFileService.uploadFolder(fileElement)
    .subscribe((data : FileElement) => {
      
    });
    this.map.set(fileElement.id, this.clone(fileElement));
    return fileElement;
  }

  private querySubject: BehaviorSubject<FileElement[]>;
  queryInFolder(folderId: string) {
    const result: FileElement[] = [];
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element));
      }
    });
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  clone(element: FileElement) {
    return JSON.parse(JSON.stringify(element));
  }
}
