import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';
import { PicturesComponent } from './pictures/pictures.component';
import { FilesComponent } from './files/files.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './helpers/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] },
  { path: 'pictures', component: PicturesComponent, canActivate: [AuthGuard] },
  { path: 'files', component: FilesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  //will be redirect to if not login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
