import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  userName;
  designation;
  salary;

  selectedId;

  constructor(public dataService: DataService,
              public activeRoute: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.dataService.gotDataSubject.subscribe((val) => {
      if(val === 'got it') {

        this.selectedId = parseInt(this.activeRoute.snapshot.params.id, 10);

        const employee = this.dataService.employeeDataMaster[this.selectedId];
        if(!employee) {
          return this.router.navigate(['']);
        }

        this.userName = employee.name;
        this.designation = employee.designation;
        this.salary = employee.salary;
      }
    });


    // this.dataService.employeeDataMaster[this.activeRoute.snapshot.params]
  }

  onSubmit(form) {
    this.dataService.employeeDataMaster[this.selectedId] = {
      name: this.userName,
      designation: this.designation,
      salary: this.salary
    };

  }

}
