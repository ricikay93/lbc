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
  @Output() selectItem: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {


  }

  ngAfterViewInit() {
    console.log(JSON.stringify(this.parents));
    $('.treeview').find('.tree-branch').each(function () {
      const branch = $(this); // li with children ul
      branch.children('.fa-spinner:first').hide();
      branch.children('ul').toggle();
    });

  }

  toggleItem(item: any, event) {
    const target = $(event.target).closest('li');

    if (target.hasClass('tree-branch')) {
      const icon = target.children('i:first');
      const loading = target.children('.fa-spinner:first');

      //   setTimeout(() => {
      //     console.log('time');
      //     target.children('.fa-spinner:first').show();
      //     icon.hide();
      if (icon.hasClass('glyphicon-chevron-down')) {
          this.notify.emit(item.parent);
      }
      //     event.preventDefault();
      // }, 200);

      // target.children('.fa-spinner:first').hide();
      // icon.show();
      icon.toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
      target.children('ul').toggle();

    }
  }


}
