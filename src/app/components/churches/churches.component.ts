import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';

import {Church} from '../../models/';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import {PubSubService } from '../../services/';

import * as $ from 'jquery';
import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-churches',
  templateUrl: './churches.component.html',
  styleUrls: ['./churches.component.css']
})
export class ChurchesComponent implements OnInit, OnDestroy {

  church: Church;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private pubSubService: PubSubService
    // private churchService: ChurchService,
  ) { }

  ngOnInit() { }

  addChurch(): void {
    this.router.navigate([ './main/circuit/churches', { outlets: { 'task': ['add'] } }]);
  }

  editChurch(): void {
    this.router.navigate([ '/main/circuit/churches', { outlets: { 'task': ['edit', 6] } }]);
  }

  getChurches(): void {
    // this.churchService.getChurches().subscribe(churches => this.churches = churches);
  }

  showChurch(): void {
    this.router.navigate(['view', 6], { relativeTo: this.route });
  }

  deleteChurch(id: number): void {

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
             swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );

        this.pubSubService.publish('churches-updated');
      }
    });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
