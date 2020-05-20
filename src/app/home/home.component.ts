import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { UserService, AuthenticationService } from '../services';
import { HttpserviceService } from '../services/httpservice.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;
  users: User[];

  constructor(private userService: UserService, private httpService: HttpserviceService) { }

  ngOnInit() {
      // this.loading = true;
      // this.userService.getAll().pipe(first()).subscribe(users => {
      //     this.loading = false;
      //     this.users = users;
      // });
  }

  checkStorageApi() {
    this.httpService.generalGet(environment.api + "/public/check-storage-api").subscribe(
      data => {
        console.log(JSON.stringify(data.message));
      },
      err => {
        console.log(JSON.stringify(err));
      }
    )
  }

}
