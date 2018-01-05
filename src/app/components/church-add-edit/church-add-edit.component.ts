import { Component, OnInit, OnDestroy } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Parish, Message } from '../../models/';
import { Observable } from 'rxjs/Observable';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'ngx-mydatepicker';
import { LookUpService, PubSubService, CircuitService, ChurchService } from '../../services/';
import { Church, ChurchContact, ChurchMissions, ChurchWorshipTime, Circuit } from '../../models/';
import * as $ from 'jquery';
import swal from 'sweetalert2';
@Component({
  selector: 'app-church-add-edit',
  templateUrl: './church-add-edit.component.html',
  styleUrls: ['./church-add-edit.component.css'],
  animations: [slideInOutAnimation],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class ChurchAddEditComponent implements OnInit {
  title = 'Add Church';
  church: Church;
  private sub: any;
  isNew: boolean;
  churchForm: FormGroup;
  parishes: Parish[];

  circuits: Circuit[];
  deletedContacts: number[];

  myOptions: INgxMyDpOptions = {
    dateFormat: 'mmm dd, yyyy',
    sunHighlight: true,
    maxYear: new Date().getFullYear()
  };

  // tabs
  wizard_tabs = [
    {
      order: 1,
      title: 'Church Information',
      icon: 'fa fa-folder-open',
      isSelected: true,
      content: '#churchInfo'
    },
    {
      order: 2,
      title: 'Address & Contact',
      icon: 'fa fa-user',
      isSelected: false,
      content: '#addressContact'
    },
    {
      order: 3,
      title: 'Church Missions',
      icon: 'fa fa-file-text-o',
      isSelected: false,
      content: '#churchMission'
    }
  ];

  days = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lookUpService: LookUpService,
    private circuitService: CircuitService,
    private churchService: ChurchService,
    private pubSubService: PubSubService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.isNew = true;
    this.getParishes();
    this.getCircuits();

    this.createForm();
  }

  private createForm(): void {
    // this.churchForm = new FormGroup({
    //   church: new FormControl('', Validators.required),
    //   seatQuota: new FormControl('', [Validators.required, Validators.min(1)]),
    //   circuit: new FormControl('', Validators.required),
    //   street: new FormControl('', Validators.required),
    //   town: new FormControl('', Validators.required),
    //   parish: new FormControl('', Validators.required),
    //   dateConst: new FormControl({ jsdate: new Date() }, Validators.required),
    //  // contacts:  this.churchForm.
    //   // this.churchForm.array([ this.createItem() ])
    // });

    this.churchForm = this.fb.group({
      church: ['', Validators.required],
      seatQuota: ['', [Validators.required, Validators.min(1)]],
      circuit: ['', Validators.required],
      street: ['', Validators.required],
      town: ['', Validators.required],
      // parish: ['', Validators.required],
      dateConst: ['', Validators.required],
      contacts: this.fb.array([this.createContact()])
    });


    // this.churchForm = this.fb.group({
    //   name: ['', [Validators.required, Validators.minLength(2)]],
    //   account: this.fb.group({
    //     email: ['', Validators.required],
    //     confirm: ['', Validators.required]
    //   });
  }

  createContact(): FormGroup {
    return this.fb.group(new ChurchContact());
  }

  saveChurch(): void {

    const churchID = Number(this.route.snapshot.params['id']);

    if (churchID) {
      alert('update church');
      //   this.churchService.updateChurch(this.churchForm.value, churchID).subscribe(
      //     result => {
      //       alert('Message: ' + result.message);
      this.pubSubService.publish('churches-updated');
      //     }
      //   );
    } else {
      alert('save church');
      //   this.churchService.saveChurch(this.churchForm.value).subscribe(
      //     result => {
      //       alert('Message: ' + result.message);
      this.pubSubService.publish('churches-updated');
      //     });
    }
  }

  addMission(): void {

  }

  deleteMission(missionDelete: ChurchMissions): void {

  }

  onDateChanged(event: IMyDateModel): void {
    this.churchForm.get('dateConst').patchValue(new Date(event.jsdate));
    // console.log('Date JSDATE :' + JSON.stringify(this.churchForm.get('dateConst').value) );
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.churchForm.get('dateConst').patchValue(new Date(event.value));
  }

  addContact(): void {
    let items;
    items = this.churchForm.get('contacts') as FormArray;
    items.push(this.createContact());
  }

  deleteContact(id: number): void {
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
        let items;
        let item;

        items = this.churchForm.get('contacts') as FormArray;
        item = items.splice(id, 1);

        this.deletedContacts.push(item.id);
        swal('Deleted!', 'Success!', 'success');
      }
    });
  }

  addWorshipTime(): void {

  }

  deleteWorshipTime(worship_time: ChurchWorshipTime): void {

  }

  getCircuits() {
    this.circuitService.getCircuits().subscribe(
      data => this.circuits = data
    );
  }

  // getDays() {
  //   // if (this.church.date_const_year !== '' && this.church.date_const_month !== '') {
  //   //   alert(new Date(Number(this.church.date_const_year), Number(this.church.date_const_month), 0).getDate());
  //   //   const max_days = new Date(Number(this.church.date_const_year), Number(this.church.date_const_month), 0).getDate();

  //   //   this.days = this.fillArrayWithNumbers(max_days);
  //   // }
  // }




  // fillArrayWithNumbers(n) {

  //   const arr = Array.apply(null, Array(n));
  //   return arr.map(function (x, i) { return i = i + 1; });
  // }

  // getMonths() {
  //   return this.lookUpService.getMonths().subscribe(data => data);
  // }

  getParishes(): void {
    this.lookUpService.getAllParishes().subscribe(
      data => this.parishes = data
    );
  }


  // tabs

  isSelected(tab_id: string | number): boolean {
    if (typeof tab_id === 'number') {
      const selected_tab = this.wizard_tabs.find(tab => tab.order === tab_id);
      return selected_tab.isSelected;
    } else {
      const selected_tab = this.wizard_tabs.find(tab => tab.content === tab_id);
      return selected_tab.isSelected;
    }
  }

  getSelected(): any {
    const selected_tab = this.wizard_tabs.find(tab => tab.isSelected === true);
    return selected_tab;
  }

  selectPage(tab_order: number): void {
    this.wizard_tabs.forEach(tab => tab.isSelected = false);
    const new_tab = this.wizard_tabs.find(tab => tab.order === tab_order);
    new_tab.isSelected = true;

    const percent = (Number(this.getSelected().order) / this.wizard_tabs.length) * 100;
    console.log('Percent: ' + percent);
    $('.progress-bar').css({ width: percent + '%' });
  }

  isFirstPage(): boolean {
    const tab = this.getSelected();
    return tab.order === 1;
  }

  isLastPage(): boolean {
    const tab = this.getSelected();
    return tab.order === this.wizard_tabs.length;
  }

  nextPage(event): void {
    const selectedTab = this.getSelected();

    if (selectedTab.order < this.wizard_tabs.length) {
      this.selectPage(selectedTab.order + 1);
    }
  }

  prevPage(): void {
    const selectedTab = this.getSelected();

    if (selectedTab.order > 1) {
      this.selectPage(selectedTab.order - 1);
    }
  }

  cancelAction(): void {

    swal({
      title: 'Are you sure?',
      text: 'All changes will not be saved',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.goBack();
      }
    });

  }

  private goBack(): void {
    if (this.isNew) {
      this.router.navigate(['/main/circuit/churches'], { queryParams: {} });
    } else {
      const churchID = Number(this.route.snapshot.params['id']);
      this.router.navigate(['/main/circuit/churches/view', churchID], { queryParams: {} });
    }
  }

}
