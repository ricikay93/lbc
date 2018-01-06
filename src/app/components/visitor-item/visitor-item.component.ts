import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';

import {Church} from '../../models/';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import {PubSubService, ChurchService } from '../../services/';

import * as $ from 'jquery';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-visitor-item',
  templateUrl: './visitor-item.component.html',
  styleUrls: ['./visitor-item.component.css']
})
export class VisitorItemComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private pubSubService: PubSubService
  ) { }

  ngOnInit() {
  }


  editVisitor(): void {
   // this.router.navigate([ '/main/circuit/churches', { outlets: { 'task': ['edit', 6] } }]);
  }

  deleteVisitor(): void {
    // const service = this.churchService;
    // const update = this.pubSubService;
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
      //  service.deleteChurch(id).subscribe(
      //     res => {
            swal('Deleted!', 'Success', 'success' );
      //      update.publish('churches-updated');
      //     }
      //   );
      }
    });
  }

}
