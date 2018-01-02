
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PubSubService, CircuitService, LookUpService } from '../../services/';
import { Circuit } from '../../models/';

import * as $ from 'jquery';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.css']
})
export class CircuitsComponent implements OnInit, OnDestroy {

  circuits: Circuit[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lookUpService: LookUpService,
    private pubSubService: PubSubService,
    private circuitService: CircuitService
  ) { }

  ngOnInit() {
    this.loadCircuits();
    // reload products when updated
    this.subscription = this.pubSubService.on('circuits-updated').subscribe(() => this.loadCircuits());
  }

  loadCircuits(): void {
    this.circuitService.getCircuits().subscribe(
      data => this.circuits = data
    );
  }

  resetSearch(): void {
    // console.log(JSON.stringify(this.filterItem));
    //  this.filterItem = new ChurchDepartment();
    //  console.log(JSON.stringify(this.filterItem));
    //  // $('.list-group-item').removeClass('open');
  }

  addCircuit(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  editCircuit(id: number): void {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  deleteCircuit(id: number): void {
    this.circuitService.deleteCircuit(id);
    this.pubSubService.publish('circuits-updated');
  }

  getParish(code: string): string {
    let parish: string;

    if (!code) {
      parish = 'No Parish Selected';
    } else {
      this.lookUpService.getParishByCode(code).subscribe(
        result => parish = result.parish
      );
    }

    return parish;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
