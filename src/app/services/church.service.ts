import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Church, Message } from '../models';
@Injectable()
export class ChurchService {

  private churchUrl = 'http://localhost:3000/api/v1/churches';

  constructor(private http: Http) { }

  getChurches(): Observable<Church[]> {
    return this.http.get(this.churchUrl).map(res => <Church[]>res.json());
  }

  /**
  * This service function that calls the http request to get a church by code
  * @param id the church id to retrieve the church
  */
  getChurchByCode(id: number): Observable<Church> {
    const url = this.churchUrl + '/' + id;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

 /**
   * This service function that calls the http request to delete
   * @param id The church id to delete
   */
  deleteChurch(id: number): Observable<Message> {
    const url = this.churchUrl + '/' + id;

    return this.http.delete(url).map(res => <Message>res.json());
  }

  /**
   * This service function that calls the http request to save
   * @param church the church object to update/save
   */
  saveChurch(church: Church): Observable<Message> {
    return this.http.post(this.churchUrl, church).map(res => <Message>res.json());
  }

  updateChurch(church: Church, id: number): Observable<Message> {
    const url = this.churchUrl + '/' + id;
    return this.http.put(url, church).map(res => <Message>res.json());
  }
}
