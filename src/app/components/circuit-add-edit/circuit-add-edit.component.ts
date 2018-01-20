import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormsModule, FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Circuit, Parish, Message } from '../../models/';
import { Observable } from 'rxjs/Observable';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';

import { LookUpService, PubSubService, CircuitService } from '../../services/';


import { Subscription } from 'rxjs/Subscription';
import $ from 'jquery';
import swal from 'sweetalert2';
import { AbstractControl } from '@angular/forms/src/model';

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

  isNew: boolean;
  // circuitModel = new Circuit();
  parishes: Parish[];
  circuitForm: FormGroup;

  lastModified: Date;
  createdAt: Date;

  formErrors = {
    'description': '',
    'parishCode': ''
  };


  formChangeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
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

    this.onValueChanged();
  }

  private createForm(): void {
    this.circuitForm = this.fb.group({
      description: [null, Validators.required],
      parishCode: ['', Validators.required]
    });

    this.formChangeSub = this.circuitForm.valueChanges.subscribe(data => this.onValueChanged());
  }

  private setErrMsgs(control: AbstractControl, errorsObj: any, field: string) {
    console.log('control' + field);
    if (this.shouldShowErrors(control) || this.circuitForm.dirty) {
      console.log('control dirty' + JSON.stringify(control.errors) + ' field' + field);
      // const messages = this.circuitService.getErrorMessages(field);

      this.circuitService.getErrorMessages('circuit').subscribe(result => {
        const messages = result[0];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[field][key] + '<br/>';
          }
        }
      });
    }
  }

  private shouldShowErrors(control: AbstractControl): boolean {
    if (control && control.errors) {
      return true;
    } else {
      return false;
    }
  }


  private onValueChanged(): void {
    if (!this.circuitForm) { return; }

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';

        this.setErrMsgs(this.circuitForm.get(field), this.formErrors, field);

      }
    }
  }

  getParishes(): void {
    this.lookUpService.getAllParishes().subscribe(
      data => this.parishes = data
    );
  }

  private setCircuit(id: number): void {

    this.circuitService.getCircuitByCode(id).subscribe((circuit: Circuit) => {
      this.lastModified = circuit.updatedAt;
      this.createdAt = circuit.createdAt;
      this.circuitForm.patchValue(circuit);
    });

    this.title = 'Edit Circuit';
    this.isNew = false;
    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an event that is no
    // longer valid (for example, an event in the past)
    const _markDirty = group => {
      for (const i in group.controls) {
        if (group.controls.hasOwnProperty(i)) {
          group.controls[i].markAsDirty();
        }
      }
    };

    _markDirty(this.circuitForm);
    this.onValueChanged();
  }

  saveCircuit(form: FormGroup): void {
    const circuitID = Number(this.route.snapshot.params['id']);

    if (form.valid) {
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
  }

  cancelAction(): void {
    console.log('circuit: ' + JSON.stringify(this.circuitForm.value));
    this.goBack();
  }

  private goBack(): void {
    this.router.navigate(['main/circuits'], { queryParams: {} });
  }

}
