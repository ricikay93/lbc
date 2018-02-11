
import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';

import { Church } from '../../models/';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { PubSubService, ChurchService, VisitorService } from '../../services/';

import { TreeComponent, TreeModel, ITreeOptions, TreeNode } from 'angular-tree-component';

import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';


@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {
  parents: any[];
  children: any[];
  nodes: any[] = [];

  options: ITreeOptions = {
    // loadingComponent: 'loading, please wait...',
    actionMapping: {
      mouse: {
        keys: {
          [KEYS.ENTER]: (tree, node, $event) => this.nodeSelectionEvent(tree, node, $event)
        },
        click: (tree, node, $event) => this.nodeSelectionEvent(tree, node, $event),
        loadingComponent: 'loading, please wait...,',
        contextMenu: (model: any, node: any, event: any) => {
          if (!node.hasChildren) {
            this.onContextMenu(event, node.data.name);
          }
        }
      }
    },
    getChildren: this.getChildren.bind(this)
  };

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

  onContextMenu(event, name): void {
    console.log('in context menu... ' + name);
  }

  nodeSelectionEvent(tree, node, $event): void {
    if (!node.hasChildren) {
      this.router.navigate(['./main/visitors/view/', node.data.id]);
    } else {
      // if parent is select toggle expanding said node
     node.toggleExpanded();
    }
  }

  getChildren(node: TreeNode) {
    return this.visitorService.getChildrenNode(node.id);
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




}
