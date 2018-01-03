import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Circuit, Message } from '../models';
@Injectable()
export class CircuitService {

  private churchUrl = 'http://localhost:3000/api/v1/circuits';

  constructor(private http: Http) { }

  /**
   * This service function
   */
  getCircuits(): Observable<Circuit[]> {
    return this.http.get(this.churchUrl).map(res => <Circuit[]>res.json());
  }

  /**
   * This service function that calls the http request to get a circuit by code
   * @param id the circuit id to retrieve the circuit
   */
  getCircuitByCode(id: number): Observable<Circuit> {
    const url = this.churchUrl + '/' + id;
console.log(url);
    return this.http.get(url).map(res => res.json());
  }

  /**
   * This service function that calls the http request to delete
   * @param id The circuit id to delete
   */
  deleteCircuit(id: number): Observable<Message> {
    const url = this.churchUrl + '/' + id;

    return this.http.delete(url).map(res => <Message>res.json());
  }

  /**
   * This service function that calls the http request to save
   * @param circuit the circuit object to update/save
   */
  saveCircuit(circuit: Circuit): Observable<Message> {
    return this.http.post(this.churchUrl, circuit).map(res => <Message>res.json());
  }


  updateCircuit(circuit: Circuit, id: number): Observable<Message> {
    const url = this.churchUrl + '/' + id;
    return this.http.put(url, circuit).map(res => <Message>res.json());
  }


}
