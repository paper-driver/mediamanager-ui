import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { PicturesComponent } from './pictures/pictures.component';
import { FilesComponent } from './files/files.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AdminComponent } from './admin/admin.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NewFolderDialogComponent } from './files/modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './files/modals/rename-dialog/rename-dialog.component';
import { FileExplorerComponent } from './files/file-explorer/file-explorer.component';


@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    PicturesComponent,
    FilesComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    AdminComponent,
    NewFolderDialogComponent,
    RenameDialogComponent,
    FileExplorerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    MaterialFileInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


