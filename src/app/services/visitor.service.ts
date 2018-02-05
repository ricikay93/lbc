import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Visitor, Message } from '../models';
import { Model } from '../components/tree/models';

import * as _ from 'lodash';

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

    const visitor = new Visitor(visitorObj.personTitle, visitorObj.fullName, visitorObj.church, visitorObj.dateAttended.jsDate);

    visitor.address = visitorObj.address;
    visitor.ageGroup = visitorObj.ageGroup;
    visitor.email = visitorObj.email;
    visitor.guestOf = visitorObj.guestOf;
    visitor.reasonVisiting = visitorObj.reasonAttended;

    if (visitorObj.telephone && visitorObj.telephone.length > 0) {
      // set list to joined string
      // visitor.telephone = visitorObj.telephone.join();
      for (const telephone in visitorObj.telephone) {
        if (telephone in visitorObj.telephone) {

        }
      }
    }

    console.log('visitor:' + JSON.stringify(visitor));

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

  getParentNodes(): Observable<any[]> {
    const url = this.visitorUrl + '/parents';

    return this.http.get(url).map(res => {
      // console.log(res);
const values = res.json();

      return values.map(item => {
        return {
          name: item.parent.charAt(0).toUpperCase() + item.parent.slice(1) + ' (' + item.total + ')',
          id: item.parent,
          hasChildren: true
        };
      });
    });
  }

  getChildrenNode(parent: string): Observable<any[]> {
    const url = this.visitorUrl + '/parents/visitors/' + parent;

    return this.http.get(url).map(res => {
      console.log(JSON.stringify(res.json()));
      return res.json().map(item => {
        return {
          name: item.fullName.charAt(0).toUpperCase() + item.parent.slice(1) + '<small>' + item.title + '</small>',
          id: item.id,
          hasChildren: false
        };
      });
    });
  }


  getErrorMessages(form): Observable<any> {
    return this.http.get('../../assets/messages.json')
      .map((res: any) => {
        const items = res.json();

        return items[form];
      });
  }

  searchInviters(term: string): Observable<any[]> {
    const url = this.visitorUrl + '/inviter/' + term;
    return this.http.get(url).map(res => {
      console.log(JSON.stringify(res.json()));
      return res.json().map(item => {
        return item.guestOf;
      });
    });
  }
}
