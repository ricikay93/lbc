import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormsModule, FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Circuit, Parish, Message } from '../../models/';
import { Observable } from 'rxjs/Observable';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';

import { LookUpService, PubSubService, CircuitService } from '../../services/';

import $ from 'jquery';
import swal from 'sweetalert2';

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
    console.log('ID' + circuitID);
    if (circuitID) {
      this.setCircuit(circuitID);
    } else {
      this.isNew = true;
    }
  }

  private createForm(): void {
    this.circuitForm = new FormGroup({
      circuit: new FormControl('', Validators.required),
      parishCode: new FormControl(null, Validators.required)
    });
  }

  getParishes(): void {
    this.lookUpService.getAllParishes().subscribe(
      data => this.parishes = data
    );
  }

  private setCircuit(id: number): void {

    this.circuitService.getCircuitByCode(id).subscribe((circuit: Circuit) => {
      console.log(circuit);
      this.lastModified = circuit.updatedAt;
      this.createdAt = circuit.createdAt;
      this.circuitForm.patchValue(circuit);
    });

    this.title = 'Edit Circuit';
    this.isNew = false;
  }

  saveCircuit(): void {
    const circuitID = Number(this.route.snapshot.params['id']);

    if (circuitID) {
      this.circuitService.updateCircuit(this.circuitForm.value, circuitID).subscribe(
        result => { alert('Message: ' + result.message); this.pubSubService.publish('circuits-updated'); }
      );
    } else {

      this.circuitService.saveCircuit(this.circuitForm.value).subscribe(
        result => { alert('Message: ' + result.message); this.pubSubService.publish('circuits-updated'); }
      );

    }

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
