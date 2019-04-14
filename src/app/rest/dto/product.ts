import { IUniqueStringIndex } from '../generic/uniquestring.index';

export class Product implements IUniqueStringIndex {
  uniqueNameOld: string;

  private _name: string;
  description: string;
  price: number;
  imagelink: string;
  rating: number;
  stock: number;
  category: string;
  subcategory: string;
  quantityInCart: number = 0;
  addToCartQuantity: number = 1;
  addToCartMessage: string;

  get uniqueName() {
    return this._name;
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
