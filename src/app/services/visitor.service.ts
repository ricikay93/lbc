import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Visitor, Message } from '../models';
@Injectable()
export class VisitorService {

  private visitorUrl = 'http://localhost:3000/api/v1/visitors';

  constructor(private http: Http) { }

  /**
   * This service function that gets all the visitors
   */
  getVisitors(): Observable<Visitor[]> {
    return this.http.get(this.visitorUrl).map(res => <Visitor[]>res.json());
  }

  getVisitorByCode(id: number): Observable<Visitor> {
    const url = this.visitorUrl + '/' + id;
    return this.http.get(url).map(res => res.json());
  }

  deleteVisitor(id: number): Observable<Message> {
    const url = this.visitorUrl + '/' + id;

    return this.http.delete(url).map(res => <Message>res.json());
  }

  saveVisitor(visitor: any): Observable<Message> {
    const newVisitor = this.createVisitor(visitor);
    return this.http.post(this.visitorUrl, newVisitor).map(res => <Message>res.json());
  }

  updateVisitor(visitor: any, id: number): Observable<Message> {
    const url = this.visitorUrl + '/' + id;
    const existingVisitor = this.createVisitor(visitor);
    return this.http.put(url, existingVisitor).map(res => <Message>res.json());
  }

  private createVisitor(visitorObj: any): Visitor {

    const telephones = '';

    const visitor = new Visitor(visitorObj.title, visitorObj.fullName, visitorObj.church, visitorObj.dateAttended.jsDate);

    // visitor.address = visitorObj.address;
    // visitor.ageGroup = visitorObj.ageGroup;
    // visitor.email = visitorObj.email;
    // visitor.guestOf = visitorObj.guestOf;

    // if (visitorObj.telephone && visitorObj.telephone.length > 0) {
    //   // set list to joined string
    //   visitor.telephone = visitorObj.telephone;
    // }

    return visitor;

  }

  getTitles(): any {
    return [
      { 'title': 'Mr' },
      { 'title': 'Ms' },
      { 'title': 'Dr' },
      { 'title': 'Mrs' }
    ];
  }

  getErrorMessages(form): Observable<any> {
    return this.http.get('../../assets/messages.json')
      .map((res: any) => {
        const items = res.json();

        return items[form];
      });
  }
}
