import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Employee} from '../models/employee';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {
  userName;
  designation;
  salary;

  constructor(public dataServeice: DataService,
              public router: Router) { }

  ngOnInit() {
  }

  onSubmit(form) {
    const record = new Employee(this.userName, this.designation, this.salary);
    this.dataServeice.employeeDataMaster.push(record);
    this.router.navigate(['']);
  }

}
