import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuCategory, MenuSubcategory } from '../../rest/dto/menucategory';
import { MenuItem } from '../../rest/dto/menuitem';

/* rubric19 */
@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {
  @Input() list: MenuItem[] = <MenuItem[]>[];
  @Output() treeviewChange = new EventEmitter<MenuItem>();
  selectedItem: MenuItem;

  constructor() { }

  /* rubric26 */
  listClick(event: MouseEvent, newValue: MenuItem) {
    console.log(event);
    console.log(newValue);
    this.selectedItem = newValue;
    newValue.showSubcategories = !newValue.showSubcategories;
    event.stopPropagation();
    this.treeviewChange.emit(newValue);
  }

  ngOnInit() {
  }
}
