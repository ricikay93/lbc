import { Component, OnInit, OnDestroy } from '@angular/core';

import {Church} from '../../models/';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-church-item',
  templateUrl: './church-item.component.html',
  styleUrls: ['./church-item.component.css']
})
export class ChurchItemComponent implements OnInit, OnDestroy {

  church: Church;
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    // private churchService: ChurchServiceService
  ) {}

  ngOnInit() {
    // this.sub = this.route.params.subscribe((params: Params) => {
    //   // this.churchService.getChurch(+params['churchId']).subscribe(church => this.church = church);
    // });
    console.log('EDit');
  }

  editChurch() {
    alert('Edit');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
