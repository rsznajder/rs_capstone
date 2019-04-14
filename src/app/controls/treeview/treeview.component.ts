import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuCategory, MenuSubcategory } from '../../rest/dto/menucategory';
import { MenuItem } from '../../rest/dto/menuitem';

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

  listClick(event: MouseEvent, newValue: MenuItem) {
    console.log(event);
    console.log(newValue);
    this.selectedItem = newValue;
    newValue.showSubcategories = !newValue.showSubcategories;
    event.stopPropagation();
    this.treeviewChange.emit(newValue);
  }

  ngOnInit() {
    /* const menuCategory1 = new MenuCategory({
      name: 'Household and Beauty'
    });
    menuCategory1.subcategories.push(new MenuSubcategory({ name: 'Baby care' }));
    menuCategory1.subcategories.push(new MenuSubcategory({ name: 'Drug Store' }));
    menuCategory1.subcategories.push(new MenuSubcategory({ name: 'Drug Store' }));
    const menuCategory2 = new MenuCategory({
      name: 'Pantry Items'
    });
    menuCategory2.subcategories.push(new MenuSubcategory({ name: 'Beverages' }));
    menuCategory2.subcategories.push(new MenuSubcategory({ name: 'Canned Goods' }));
    menuCategory2.subcategories.push(new MenuSubcategory({ name: 'Cooking and Baking Needs' }));
    this.list.push(menuCategory1, menuCategory2); */

    /*
    'category': 'Household and Beauty',
    'subcategory': 'Baby care'

    'category': 'Household and Beauty',
    'subcategory': 'Drug Store'

    'category': 'Household and Beauty',
    'subcategory': 'Household Supplies'

    'category': 'Pantry Items',
    'subcategory': 'Beverages'

    'category': 'Pantry Items',
    'subcategory': 'Canned Goods'

    'category': 'Pantry Items',
    'subcategory': 'Cooking and Baking Needs'
    */
  }
}
