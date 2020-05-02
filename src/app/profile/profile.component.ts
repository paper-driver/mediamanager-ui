import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { HttpserviceService } from '../services/httpservice.service';
import {User, Role} from '../models';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  roles: Role[];
  selectedRoles: Role[] = [];

  roleForm = new FormControl();
  emailForm = new FormControl();
  newpwdForm = new FormControl();
  confirmpwdForm = new FormControl();

  formGroup: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hide = true;
  isSuccessful = false;
  msg: any;

  constructor(
    private authenticationService : AuthenticationService, 
    private httpservice : HttpserviceService,
    private formBuilder: FormBuilder) {

    this.authenticationService.currentUser
    .subscribe(x => {
      this.currentUser = x;
      this.emailForm.setValue(this.currentUser.email);
    });
   }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: this.emailForm,
      roles: this.roleForm,
      newpwd: this.newpwdForm,
      confirmpwd: this.confirmpwdForm
    })

    this.httpservice.getRoleTypes().subscribe(
      roles => {
        this.roles = roles["list"];
        if(this.currentUser != null){
          this.roles.forEach(role => {
            if(this.currentUser.roles.indexOf(role.name) !== -1){
              this.selectedRoles.push(role);
            }
          });
          this.roleForm.setValue(this.selectedRoles);
        }
      }
    )

  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
        return;
    }

    let checkPwdFlag = this.checkNewPassword();
    if(checkPwdFlag){
      this.loading = true;
      this.httpservice.updateProfile(
        this.currentUser.username, this.f.email.value, this.f.roles.value, this.f.newpwd.value)
        .subscribe(
          data => {
            console.log(data);
            this.isSuccessful = true;
            this.loading = false;
            this.msg = data.message;
          },
          err => {
            this.error = JSON.stringify(err);
            this.loading = false;
          }
        );
    }
  }

  checkNewPassword(){
    if(this.f.newpwd.value == null || this.f.newpwd.value == ""){
      this.error = "";
      return true;
    }else{
      if(this.f.confirmpwd.value == null || this.f.confirmpwd.value == ""){
        this.error = "Please confirm your new password";
        return false;
      }else{
        if(this.f.newpwd.value == this.f.confirmpwd.value){
          this.error = "";
          return true;
        }else{
          this.error = "Passwords do not match";
          return false;
        }
      }
    }
  }

}
