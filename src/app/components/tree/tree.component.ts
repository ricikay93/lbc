import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import $ from 'jquery';
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() parents: any[];
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log(JSON.stringify(this.parents));
  }

  toggleItem(item: string, event) {
    // f (this == e.target) {
    //   var icon = $(this).children('i:first');
      const icon = $(event.target).children('i:first');
      icon.toggleClass('glyphicon-chevron-down');
    //  icon.toggleClass("glyphicon-chevron-down glyphicon-chevron-right");

// this.notify.emit(item);
  }


}
