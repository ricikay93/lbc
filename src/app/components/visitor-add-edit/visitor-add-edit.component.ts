import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'ngx-mydatepicker';

import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Visitor, Message } from '../../models/';

import { Subscription } from 'rxjs/Subscription';

import { LookUpService, PubSubService, VisitorService, ChurchService } from '../../services/';
import { AbstractControl } from '@angular/forms/src/model';

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
  title = 'Add Visitor';
  errorMsg = '';
  isNew: boolean;

  lastModified: Date;
  createdAt: Date;

  formChangeSub: Subscription;
  titles: any;

  formErrors = {
    personTitle: '',
    fullName: '',
    // church: '',
    dateAttended: '',
    contacts: ''
  };

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
    private churchService: ChurchService,
    private visitorService: VisitorService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setVisitorForm();
    this.getTitles();
    const circuitID = Number(this.route.snapshot.params['id']);

    if (circuitID) {
      this.setVisitor(circuitID);
    } else {
      this.isNew = true;
    }

    this.onValueChanged();
  }
  private setVisitorForm(): void {
    this.visitorForm = this.fb.group({
      personTitle: ['', Validators.required],
      fullName: ['', Validators.required],
      address: [''],
      ageGroup: [''],
      contacts: this.fb.array([]),
      email: [''],
      invitedBy: [''],
      church: [''],
      // church: ['', Validators.required],
      dateAttended: ['', Validators.required],
      reasonAttended: ['']
    });

    this.formChangeSub = this.visitorForm.valueChanges.subscribe(data => this.onValueChanged());
  }

  addContact(): void {

    this.contacts.push(this.createContact());
    console.log('contacts errors: ' + this.contacts.errors);
    // const cont = this.visitorForm.get('contacts') as FormGroup;


    // if (this.isContactLessThanMax && this.contacts.errors === null) {
    // } else {
    //   console.log('ErrList');
    //   // const errList = [];

    //   // if (!this.isContactLessThanMax) {
    //   //   errList.push('max');
    //   // } else if (this.contacts.errors !== null) {
    //   //   errList.push('required');
    //   // }

    //   // this.setErrMsg(errList, this.formErrors, 'contacts');
    // }

  }

  get isContactLessThanMax() {
    return this.contactCount < 10;
  }


  deleteContact(id: number): void {
    this.contacts.removeAt(id);
  }

  createContact(): FormGroup {
    return this.fb.group({
      tele: ['', Validators.required]
    });

  }

  get contacts() {
    return this.visitorForm.get('contacts') as FormArray;
  }

  get contactCount() {
    return this.contacts.controls.length;
  }

  private getTitles(): void {
    this.titles = this.visitorService.getTitles();
  }

  private setVisitor(id: number): void {
    //  this.visitorService.getVisitorByCode
    this.visitorService.getVisitorByCode(id).subscribe((visitor: Visitor) => {
      this.lastModified = visitor.lastModified;
      this.createdAt = visitor.createdAt;
      this.visitorForm.patchValue(visitor);

      // create list from
      const teles = visitor.telephone.split(',');
      // let teleForm =  this.visitorForm.get('telephone').;

      const telesJSON = teles.forEach(element => {
        return {
          contact: element
        };
      });

      this.visitorForm.get('telephones').patchValue(telesJSON);

    });

    this.title = 'Edit Visitor';
    this.isNew = false;
  }


  saveVisitor(form: FormGroup): void {
    if (form.valid) {
      const circuitID = Number(this.route.snapshot.params['id']);

      if (circuitID) {
        this.visitorService.updateVisitor(this.visitorForm.value, circuitID).subscribe(
          result => { alert('Message: ' + result.message); this.pubSubService.publish('visitors-updated'); }
        );
      } else {

        // this.visitorService.saveVisitor(this.visitorForm.value).subscribe(
        //   result => { alert('Message: ' + result.message); this.pubSubService.publish('visitors-updated'); }
        // );

        console.log('form ' + form);

      }

      // redirect to users view
      this.goBack();
    }


  }

  private setErrMsgs(control: AbstractControl, errorsObj: any, field: string) {
    if (this.shouldShowErrors(control) || this.visitorForm.dirty) {
      this.visitorService.getErrorMessages('visitor').subscribe(result => {
        const messages = result[0];
        for (const key in control.errors) {

          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[field][key] + '<br/>';
          }
        }
      });
    }
  }

  private setErrMsg(errors: any[], errorsObj: any, field: string) {
    this.visitorService.getErrorMessages('visitor').subscribe(result => {
      const messages = result[0];

      for (const key in errors) {
        if (key in errors) {
          errorsObj[field] += messages[field][key] + '<br/>';
        }
      }
    });
  }


  private shouldShowErrors(control: AbstractControl): boolean {
    if (control && control.errors) {
      return true;
    } else {
      return false;
    }
  }


  private onValueChanged(): void {
    if (!this.visitorForm) { return; }

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        if (field !== 'contacts') {
          this.formErrors[field] = '';
          this.setErrMsgs(this.visitorForm.get(field), this.formErrors, field);
        }

      }
    }
  }

  onDateChanged(event: IMyDateModel): void {
    this.visitorForm.get('dateAttended').patchValue(new Date(event.jsdate));
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.visitorForm.get('dateAttended').patchValue(new Date(event.value));
  }

  cancelAction(): void {

    this.goBack();
  }

  private goBack(): void {
    this.router.navigate(['main/visitors'], { queryParams: {} });
  }



}
