import { Injectable } from '@angular/core';
import { CartProduct } from '../../rest/dto/cartproduct';
import { Globals } from '../../_globals/globals';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _productInCartList: CartProduct[] = <CartProduct[]>[];
  private _taxPercent: number = 10;
  private _cartNetSum: number = 0;
  private _cartGrossSum: number = 0;
  private _defaultShippingCost: number = 0;
  private _cartGrossTotalSum: number = 0;

  public get productInCartList(): CartProduct[] {
    return this._productInCartList;
  }
  public get cartNetSum(): number {
    return this._cartNetSum;
  }
  public get cartGrossSum(): number {
    return this._cartGrossSum;
  }
  public get defaultShippingCost(): number {
    return this._defaultShippingCost;
  }
  public get cartGrossTotalSum(): number {
    return this._cartGrossTotalSum;
  }

  constructor(private _globals: Globals) { }

  get_productInCartList() {
    return this._productInCartList;
  }

  addProduct(newProduct: CartProduct): boolean {
    if (!newProduct || !newProduct.quantity || !(newProduct.quantity > 0)) {
      return false;
    }
    const idx = this.findProductIndex(newProduct);
    // product exists in cart
    if (idx >= 0) {
      this._productInCartList[idx].quantity = this._productInCartList[idx].quantity + newProduct.quantity;
      this._productInCartList[idx].netSum =
        this._globals.roundNetOrGrossSum(this._productInCartList[idx].quantity * this._productInCartList[idx].price);
        this.sumUpCart();
    } else {
      newProduct.netSum = this._globals.roundNetOrGrossSum(newProduct.quantity * newProduct.price);
      this._productInCartList.push(newProduct);
      this.sumUpCart();
    }
    console.log('add product: ' + newProduct);
    console.log('cart: ' + this._productInCartList);
    return true;
  }

  addOrSubstractQuantity(product: CartProduct, quantity: number): boolean {
    if (!product || !product.quantity || !(product.quantity > 0)) {
      return false;
    }
    if (!quantity || (!(quantity > 0 || quantity < 0))) {
      return false;
    }
    const idx = this.findProductIndex(product);
    if (idx >= 0) {
      this._productInCartList[idx].quantity = this._productInCartList[idx].quantity + quantity;
      this._productInCartList[idx].netSum =
        this._globals.roundNetOrGrossSum(this._productInCartList[idx].quantity * this._productInCartList[idx].price);
      this.sumUpCart();
      return true;
    } else {
      return false;
    }
  }

  modifyProduct(product: CartProduct, newQuantity: number): boolean {
    if (!product || !(newQuantity > 0 || newQuantity < 0)) {
      return false;
    }
    const idx = this.findProductIndex(product);
    if (idx >= 0) {
      this._productInCartList[idx].quantity = newQuantity;
      this._productInCartList[idx].netSum =
          this._globals.roundNetOrGrossSum(this._productInCartList[idx].quantity * this._productInCartList[idx].price);
      this.sumUpCart();
      return true;
    }
    return false;
  }

  deleteProduct(product: CartProduct): boolean {
    if (!product) {
      return false;
    }
    const idx = this.findProductIndex(product);
    if (idx >= 0) {
      this._productInCartList.splice(idx, 1);
      this.sumUpCart();
      return true;
    }
    return false;
  }

  sumUpCart() {
    if (this._productInCartList.length === 0) {
      this._cartNetSum = 0;
      this._cartGrossSum = 0;
      this._defaultShippingCost = 0;
      this._cartGrossTotalSum = 0;
      return;
    }
    this._defaultShippingCost = 10;
    let cartNetSum = 0;
    for (let i = 0; i < this._productInCartList.length; i++) {
      cartNetSum = cartNetSum + this._productInCartList[i].netSum;
    }
    this._cartNetSum = cartNetSum;
    this._cartGrossSum = cartNetSum + this._globals.roundNetOrGrossSum(cartNetSum * 0.1);
    this._cartGrossTotalSum = this._cartGrossSum + this._defaultShippingCost;
  }

  getQuantityInCartByName(productName: string): number {
    const idx = this.findProductIndexByName(productName);
    if(idx >= 0) {
      return this._productInCartList[idx].quantity;
    } else {
      return 0;
    }
  }

  findProductIndex(product: CartProduct): number {
    for (let i = 0; i < this._productInCartList.length; i++) {
      if (this._productInCartList[i].name === product.name) {
        return i;
      }
    }
    return -1;
  }

  findProductIndexByName(productName: string): number {
    for (let i = 0; i < this._productInCartList.length; i++) {
      if (this._productInCartList[i].name === productName) {
        return i;
      }
    }
    return -1;
  }
}
