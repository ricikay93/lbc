import { Component, OnInit, OnDestroy } from '@angular/core';

import {Church} from '../../models/';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ChurchService } from '../../services/';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-church-item',
  templateUrl: './church-item.component.html',
  styleUrls: ['./church-item.component.css']
})
export class ChurchItemComponent implements OnInit, OnDestroy {

  church: Church;
  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private churchService: ChurchService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.churchService.getChurchByCode(+params['churchId']).subscribe(data => this.church = data);
    });
  }

  editChurch(id: number) {
    this.router.navigate([ '/main/circuit/churches', { outlets: { 'task': ['edit', id] } }]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
