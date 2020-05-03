import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mediamanager-ui';
  currentUser: User;
  showAdminBoard: boolean = false;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => {
        this.currentUser = x;
        if(this.currentUser && this.currentUser.roles.indexOf("ROLE_ADMIN") != -1){
          this.showAdminBoard = true;
        }else{
          this.showAdminBoard = false;
        }
      });
  }

  ngOnInit() {
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
