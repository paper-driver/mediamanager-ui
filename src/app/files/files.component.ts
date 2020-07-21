import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UploadFileService } from '../services';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from '../services/file.service';
import { FileElement } from './model/element';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  public fileElements: Observable<FileElement[]>;

  constructor(public fileService: FileService) { }

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;

  ngOnInit(): void {
    this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.uuid : null)
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
          this.isSuccessful = true;
        }
      },
      err => {
        this.progress = 0;
        this.err = 'Could not upload the file!';
        this.error = true;
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }

}
