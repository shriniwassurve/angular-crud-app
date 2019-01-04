import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from '../models/employee';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  employeeDataMaster: Employee[];
  gotDataSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public http: HttpClient) {
    this.getContentJSON()
      .pipe(
        map((item) => item['employees'])
      )
      .subscribe((result) => {
        this.employeeDataMaster = result;
        this.gotDataSubject.next('got it');
      })
  }

  getContentJSON() {
    return this.http.get("assets/data.json");
  }

}
