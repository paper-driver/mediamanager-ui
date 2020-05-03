import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { HttpserviceService } from '../services/httpservice.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['token', 'username', 'email', 'pendingRoles'];
  dataSource: MatTableDataSource<Request>;
  error = ""

  constructor(private httpService: HttpserviceService) { 
    this.httpService.getAllRequests().subscribe(
      data => {
      this.dataSource = new MatTableDataSource<Request>(data);
      this.dataSource.paginator = this.paginator;
      },
      err => {
        this.error = err;
      }
    );
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    
  }

}
