import { Component, OnInit, OnDestroy } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Parish, Message } from '../../models/';
import { Observable } from 'rxjs/Observable';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';

import { LookUpService, PubSubService, CircuitService, ChurchService } from '../../services/';
import { Church, ChurchContact, ChurchMissions, ChurchWorshipTime, Circuit } from '../../models/';
import $ from 'jquery';
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
    private circuitService: CircuitService
    // private churchService: ChurchServiceService
  ) { }

  ngOnInit() {
    this.isNew = true;
    this.getParishes();
    this.getCircuits();
  }

  private createForm(): void {
    this.churchForm = new FormGroup({
      church: new FormControl('', Validators.required),
      seatQuota: new FormControl('', [Validators.required, Validators.min(1)]),
      circuit: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      parish: new FormControl('', Validators.required),
      dateConst: new FormControl('', [Validators.required, Validators.pattern('MMM dd, yyyy')])
    });
  }

  addMission(): void {

  }

  deleteMission(missionDelete: ChurchMissions): void {
    // const missions = this.church.missions;
    // for (let i = 0; i < missions.length; i++) {
    //   const mission = missions[i];
    //   if ( mission.mission === missionDelete.mission) {
    //     missions.splice(i, 1);
    //     break;
    //   }
    // }
  }

  addContact(): void {

  }

  deleteContact(contactDelete: ChurchContact): void {

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
