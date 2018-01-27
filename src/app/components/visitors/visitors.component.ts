
import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';

import {Church} from '../../models/';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import {PubSubService, ChurchService, VisitorService } from '../../services/';
@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {
parents: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private pubSubService: PubSubService,
    private visitorService: VisitorService
  ) { }

  ngOnInit() {
    this.visitorService.getParentNodes().subscribe(parents => this.parents = parents);
  }

  addVisitor(): void {
     this.router.navigate([ './main/visitors', { outlets: { 'task': ['add'] } }]);
  }

  loadChildren(message: string): void {

  }
}
