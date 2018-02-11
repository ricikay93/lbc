import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';

import { Church, Visitor } from '../../models/';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LookUpService, PubSubService, CircuitService, ChurchService, VisitorService } from '../../services/';
import * as $ from 'jquery';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-visitor-item',
  templateUrl: './visitor-item.component.html',
  styleUrls: ['./visitor-item.component.css']
})
export class VisitorItemComponent implements OnInit {
  private sub: Subscription;

  visitor: Visitor;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private pubSubService: PubSubService,
    private visitorService: VisitorService

  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.visitorService.getVisitorByCode(+params['id']).subscribe(data => {this.visitor = data;  });
    });
  }


  editVisitor(): void {
    this.router.navigate(['/main/visitors', { outlets: { 'task': ['edit', 6] } }]);
  }

  deleteVisitor(): void {
    const service = this.visitorService;
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
        service.deleteVisitor(this.visitor.id).subscribe(res => {
          swal('Deleted!', 'Success', 'success');
          //      update.publish('churches-updated');
        });
      }
    });
  }

}
