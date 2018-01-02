import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormsModule, FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Circuit, Parish, Message } from '../../models/';
import { Observable } from 'rxjs/Observable';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';

import { LookUpService, PubSubService, CircuitService } from '../../services/';

import $ from 'jquery';
// import { lookup } from 'dns';
// import swal from 'sweetalert2';

@Component({
  selector: 'app-circuit-add-edit',
  templateUrl: './circuit-add-edit.component.html',
  styleUrls: ['./circuit-add-edit.component.css'],
  animations: [slideInOutAnimation],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})

export class CircuitAddEditComponent implements OnInit {
  title = 'Add Circuit';
  errorMsg = '';
  isNew: boolean;
  // circuitModel = new Circuit();
  parishes: Parish[];
  circuitForm: FormGroup;

  lastModified: Date;
  createdAt: Date;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lookUpService: LookUpService,
    private pubSubService: PubSubService,
    private circuitService: CircuitService
  ) { }

  ngOnInit() {
    this.getParishes();

    this.createForm();

    const circuitID = Number(this.route.snapshot.params['id']);
    if (circuitID) {
      this.setCircuit(circuitID);
    } else {
      this.isNew = true;
    }
  }

  private createForm(): void {
    this.circuitForm = new FormGroup({
      circuit: new FormControl('', Validators.required),
      parish: new FormControl('', Validators.required)
    });
  }

  getParishes(): void {
    this.lookUpService.getAllParishes().subscribe(
      data => this.parishes = data
    );
  }

  private setCircuit(id: string | number): void {
    let circuit: Circuit;

    this.circuitService.getCircuitByCode(id).subscribe(
      result => circuit = result
    );

    this.title = 'Edit Circuit';
    this.isNew = false;

    this.lastModified = circuit.lastModified;
    this.createdAt = circuit.createdAt;

    this.circuitForm.patchValue(circuit);
  }

  saveCircuit(): void {
    const circuitID = Number(this.route.snapshot.params['id']);
    let status: Message;
    if (circuitID) {

      this.circuitService.updateCircuit(this.circuitForm.value, circuitID).subscribe(
        result => status = result
      );

      alert('Message: ' + status);
    } else {

      this.circuitService.saveCircuit(this.circuitForm.value).subscribe(
        result => status = result
      );

      alert('Message: ' + status);
    }


    this.pubSubService.publish('circuits-updated');
    // redirect to users view
    this.goBack();

  }

  cancelAction(): void {
    this.goBack();
  }

  private goBack(): void {
    if (this.isNew) {
      this.router.navigate(['../'], { relativeTo: this.route, queryParams: {} });
    } else {
      this.router.navigate(['../../'], { relativeTo: this.route, queryParams: {} });
    }
  }

}
