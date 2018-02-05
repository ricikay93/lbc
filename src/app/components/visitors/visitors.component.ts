
import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';

import { Church } from '../../models/';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { PubSubService, ChurchService, VisitorService } from '../../services/';

import { TreeComponent, TreeModel, ITreeOptions, TreeNode } from 'angular-tree-component';
// import { ITreeOptions, TreeNode} from 'angular-tree-component';

// declare var $: any;

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {
  parents: any[];
  children: any[];
  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this)
  };

  nodes: any[] = [];

  // asyncChildren = [
  //   {
  //     name: 'child1',
  //     hasChildren: true
  //   }, {
  //     name: 'child2'
  //   }
  // ];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private pubSubService: PubSubService,
    private visitorService: VisitorService
  ) { }

  ngOnInit() {
    const tempService = this.visitorService;

    this.visitorService.getParentNodes().subscribe(parents => this.nodes = parents);
  }

  getChildren(node: any) {
    // const newNodes = this.asyncChildren.map((c) => Object.assign({}, c));

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => resolve(newNodes), 1000);
    // });
    console.log('Node: ' + node.id);
    return this.visitorService.getChildrenNode(node.id);
    // options = {
    //   getChildren: (node:TreeNode) => {
    //     return request('/api/children/' + node.id);
    //   }
    // }

  }

  changeParentByChurch(value: any) {
    if (value === '') {

    } else {

    }
    this.visitorService.getParentNodes().subscribe(parents => this.parents = parents);
  }

  addVisitor(): void {
    this.router.navigate(['./main/visitors', { outlets: { 'task': ['add'] } }]);
  }

  loadChildren(parent: string): void {
    this.visitorService.getChildrenNode(parent).subscribe(children => {
      console.log('children' + children);
    });
  }


}
