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


    // const allEle = $('li');
    console.log($('ul#treeview-tree').children());
// console.log($('#treeview-tree').children().length);
    // $('.treeview').find('.tree-branch').each(function (target) {
    //   // target.children('ul').hide();
    //   console.log('target' + target);
    //   console.log('Child' + target.children());
    // });
    // tree.find('li').has("ul").each(function () {
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

    }

    // const icon = $(target).children('i:first');
    // console.log(target.closest('li'));
    // console.log(target.closest('li').hasClass('tree-branch'));
    // if (target.parent().parent().is('li')) {
    //   target.parent().parent().children().toggle();
    // }else {
    //   console.log(target.parent().parent());
    // }
    // const icon = $(event.target).children('i:first');

    // icon.toggleClass('glyphicon-chevron-down');
    //  icon.toggleClass("glyphicon-chevron-down glyphicon-chevron-right");

    // 
  }


}
