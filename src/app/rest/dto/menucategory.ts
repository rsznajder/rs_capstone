import { MenuItem } from './menuitem';

export class MenuSubcategory extends MenuItem {
  name: string;
  subcategories: MenuSubcategory[] = <MenuSubcategory[]>[];
  showSubcategories: boolean;

  public constructor(init?: Partial<MenuSubcategory>) {
    super();
    Object.assign(this, init);
  }
}

export class MenuCategory extends MenuItem {
  name: string;
  subcategories: MenuSubcategory[] = <MenuSubcategory[]>[];
  showSubcategories: boolean;

  public constructor(init?: Partial<MenuCategory>) {
    super();
    Object.assign(this, init);
  }
}
