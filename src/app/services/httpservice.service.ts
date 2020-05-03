import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, first, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, Role, UpdateRequest } from '../models/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getRoleTypes(): Observable<any>{
    return this.http.get<Role[]>(environment.roletypes, httpOptions);
  }

  updateProfile(username:String, email:String, roles:Role[], password:String): Observable<any>{
    return this.http.post(environment.updateProfile, 
      {
        username: username,
        email: email,
        role: roles,
        password: password
      }, httpOptions);
  }

  getAllRequests(): Observable<any>{
    return this.http.get<UpdateRequest[]>(environment.getAllRequests, httpOptions);
  }

  generalGet(url): Observable<any>{
    return this.http.get<any>(url, httpOptions);
  }

}
