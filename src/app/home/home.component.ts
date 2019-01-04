import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import { Employee } from '../models/employee';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('search') search: ElementRef;
  dataMaster;
  employeeData: Employee[];
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.gotDataSubject.subscribe((val) => {
      if(val === 'got it') {
        this.dataMaster = this.dataService.employeeDataMaster;
        this.employeeData = this.dataMaster;
        console.log(this.employeeData);
      }
    });
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(val => {
        this.employeeData = this.dataMaster;
        if (val !== '') {
          this.employeeData = this.employeeData.filter(item => (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
            || (item.designation.toLowerCase().indexOf(val.toLowerCase()) > -1));
        }
      });
  }

  delete(index) {
    this.dataService.employeeDataMaster.splice(index, 1);
  }

}
