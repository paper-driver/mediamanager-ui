import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileElement } from '../model/element';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from '../modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from '../modals/rename-dialog/rename-dialog.component';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent {

  constructor(public dialog: MatDialog) { }

  // input from the child component
  @Input() fileElements: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  // output to parent component
  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  // logics of outputing what variables to parent component
  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  // logics to tell variable change to parent component due to child component, which is dialog.
  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  // menu logic for this component (such as right click to show what can be done for each folder)
  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }

}
