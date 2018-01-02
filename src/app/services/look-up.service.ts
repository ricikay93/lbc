import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Parish, Month, Skill } from '../models/lookUp';

@Injectable()
export class LookUpService {

  private churchUrl = 'http://localhost:3000/api/v1/lookup/';


  constructor(private http: Http) { }

  getListOfYears() {
    const date = new Date('01' + 'January 1600');
    const first = date.getFullYear();

    const last = new Date();
    const second = last.getFullYear();
    const arr = Array();

    for (let i = first; i <= second; i++) {
      arr.push(i);
    }

    return arr;
  }

  getMonths() {
    return this.http.get(this.churchUrl + 'months').map(res => <Month>res.json());
  }

  getAllSkills() {
    return this.http.get(this.churchUrl + 'skills').map(res => <Skill>res.json());
  }

  getAllParishes(): Observable<Parish[]> {
    const url = this.churchUrl + 'parishes';
    return this.http.get(url).map(res => <Parish[]>res.json());
  }

  getParishByCode(id: string): Observable<Parish> {
    const url = this.churchUrl + 'parishes/' + id;
    return this.http.get(url).map(res => <Parish>res.json());
  }
}
