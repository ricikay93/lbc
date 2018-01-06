import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'ngx-mydatepicker';

import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { LookUpService, PubSubService, CircuitService } from '../../services/';


import * as $ from 'jquery';
import swal from 'sweetalert2';
@Component({
  selector: 'app-visitor-add-edit',
  templateUrl: './visitor-add-edit.component.html',
  styleUrls: ['./visitor-add-edit.component.css'],
  animations: [slideInOutAnimation],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class VisitorAddEditComponent implements OnInit {
  title = 'Add Circuit';
  errorMsg = '';
  isNew: boolean;

  lastModified: Date;
  createdAt: Date;

  visitorForm: FormGroup;
  
  myOptions: INgxMyDpOptions = {
    dateFormat: 'mmm dd, yyyy',
    sunHighlight: true,
    minYear: new Date().getFullYear() - 2,
    maxYear: new Date().getFullYear()
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lookUpService: LookUpService,
    private pubSubService: PubSubService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // this.getParishes();

    this.setVisitorForm();
    const circuitID = Number(this.route.snapshot.params['id']);

    if (circuitID) {
      this.setVisitor(circuitID);
    } else {
      this.isNew = true;
    }
  }
  private setVisitorForm(): void {
    this.visitorForm = this.fb.group({
      personTitle: ['', Validators.required],
      fullName: ['', Validators.required],
      address: [''],
      circuit: ['', Validators.required],
      ageGroup: [''],
      telephone: [''],
      email: ['', [Validators.email]],
      invitedBy: [''],
      church: ['', Validators.required],
      dateAttended: [''],
      reasonAttended: ['']
    });
  }

  private setVisitor(id: number): void {

    // this.circuitService.getCircuitByCode(id).subscribe((circuit: Circuit) => {
    //   this.lastModified = circuit.updatedAt;
    //   this.createdAt = circuit.createdAt;
    //   this.circuitForm.patchValue(circuit);
    // });

    this.title = 'Edit Circuit';
    this.isNew = false;
  }

  saveChurch(): void {
    // const circuitID = Number(this.route.snapshot.params['id']);

    // if (circuitID) {
    //   this.circuitService.updateCircuit(this.circuitForm.value, circuitID).subscribe(
    //     result => { alert('Message: ' + result.message); this.pubSubService.publish('circuits-updated'); }
    //   );
    // } else {

    //   this.circuitService.saveCircuit(this.circuitForm.value).subscribe(
    //     result => { alert('Message: ' + result.message); this.pubSubService.publish('circuits-updated'); }
    //   );

    // }

    // redirect to users view
    this.goBack();

  }

  onDateChanged(event: IMyDateModel): void {
    // this.churchForm.get('dateConst').patchValue(new Date(event.jsdate));
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    // this.churchForm.get('dateConst').patchValue(new Date(event.value));
  }

  cancelAction(): void {
    // console.log('circuit: ' + JSON.stringify(this.circuitForm.value));
    this.goBack();
  }

  private goBack(): void {
    this.router.navigate(['main/circuits'], { queryParams: {} });
  }

}
