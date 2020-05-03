import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { HttpserviceService } from '../services/httpservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateRequest } from '../models/updateRequest'

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['token', 'username', 'email', 'expiryDate', 'pendingRoles', 'buttons'];
  dataSource: MatTableDataSource<UpdateRequest>;
  error = "";
  msg = "";
  loading = true;

  constructor(private httpService: HttpserviceService) { 
    this.httpService.getAllRequests().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<UpdateRequest>(data);
        this.dataSource.data.forEach(request => {
          this[request.username + "-approved"] = false;
          this[request.username + "-rejected"] = false;
          this[request.username + "-loading"] = false;
        });
        this.dataSource.paginator = this.paginator;
        if(this.dataSource != null) {
          this.loading = false;
        }
      },
      err => {
        this.error = err;
      }
    );
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
  }

  approveRequest(request: UpdateRequest){
    this[request.username + "-loading"] = true;
    this.httpService.generalGet(environment.approveRequest + request.token).subscribe(
      data => {
        this.msg = data.message;
        this[request.username + "-loading"] = false;
        this[request.username + "-approved"] = true;
      },
      err => {
        this.error = err;
        this[request.username + "-loading"] = false;
      }
    )
  }

  rejectRequest(request: UpdateRequest){
    this[request.username + "-loading"] = true;
    this.httpService.generalGet(environment.approveRequest + request.token).subscribe(
      data => {
        this.msg = data.message;
        this[request.username + "-loading"] = false;
        this[request.username + "-rejected"] = true
      },
      err => {
        this.error = err;
        this[request.username + "-loading"] = false;
      }
    )
  }

}
