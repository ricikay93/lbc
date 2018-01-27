import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';


import $ from 'jquery';
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, AfterViewInit {
  @Input() parents: any[];
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log(JSON.stringify(this.parents));

  }

  ngAfterViewInit() {

    $('.treeview').find('.tree-branch').each(function () {
      const branch = $(this); // li with children ul
      branch.children('ul').toggle();
    });

  }

  toggleItem(item: string, event) {
    // f (this == e.target) {
    //   var icon = $(this).children('i:first');
    const target = $(event.target).closest('li');

    if (target.hasClass('tree-branch')) {
      const icon = target.children('i:first');
      icon.toggleClass('glyphicon-chevron-right glyphicon-chevron-down');

      if (icon.hasClass('glyphicon-chevron-down')) {
        // this.notify.emit(item);
      }

      target.children('ul').toggle();
      event.preventDefault();
    }
  }


}
