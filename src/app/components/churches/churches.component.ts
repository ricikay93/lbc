import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';

import {Church} from '../../models/';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import {PubSubService, ChurchService } from '../../services/';

import * as $ from 'jquery';
import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-churches',
  templateUrl: './churches.component.html',
  styleUrls: ['./churches.component.css']
})
export class ChurchesComponent implements OnInit, OnDestroy {

  churches: Church[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private pubSubService: PubSubService,
    private churchService: ChurchService
  ) { }

  ngOnInit() {
    this.loadChurches();
    // reload products when updated
    this.subscription = this.pubSubService.on('churches-updated').subscribe(() => this.loadChurches());
   }

  addChurch(): void {
    this.router.navigate([ './main/circuit/churches', { outlets: { 'task': ['add'] } }]);
  }

  editChurch(): void {
    this.router.navigate([ '/main/circuit/churches', { outlets: { 'task': ['edit', 6] } }]);
  }

  loadChurches(): void {
    this.churchService.getChurches().subscribe(data => this.churches = data);
  }

  showChurch(): void {
    this.router.navigate(['view', 6], { relativeTo: this.route });
  }

  deleteChurch(id: number): void {
    const service = this.churchService;
    const update = this.pubSubService;
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function (result) {
      if (result.value) {
       service.deleteChurch(id).subscribe(
          res => {
            swal('Deleted!', res.message, 'success' );
           update.publish('churches-updated');
          }
        );
      }
    });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
