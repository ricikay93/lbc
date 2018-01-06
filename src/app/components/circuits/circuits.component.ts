
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PubSubService, CircuitService, LookUpService } from '../../services/';
import { Circuit } from '../../models/';

import * as $ from 'jquery';
import swal from 'sweetalert2';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.circuitService.deleteCircuit(id).subscribe(
          res => {
            swal('Deleted!', res.message, 'success' );
            this.pubSubService.publish('circuits-updated');
          }
        );
      }
    });

  }

  getParish(code: string): string {


    if (code === null) {
      return 'No Parish Selected';
    } else {
      this.lookUpService.getParishByCode(code).subscribe(
        function(result){
          return result.parish;
        }
      );
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
