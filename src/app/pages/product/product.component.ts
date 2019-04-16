import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../rest/dto/product';
import { CartProduct } from '../../rest/dto/cartproduct';
import { FindProductResponse } from '../../services/product/findproduct.response';
import { FindProductResponseTypes } from '../../services/product/findproduct-responsetypes.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  selectedProductResponse: FindProductResponse = new FindProductResponse(null, FindProductResponseTypes.WaitForList);
  selectedProductName: string;
  productQuantity: number = 1;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location,
    private _productService: ProductService,
    private _cartService: CartService
  ) {
    const localThis = this;
    _router.events.subscribe(val => {
      localThis.locationChanged(val);
    });
    _productService.productListChanged$.asObservable().subscribe((value) => {
      // debugger;
      if (value.message === 'new data') {
        localThis.selectedProductResponse = localThis._productService.findProductByName(localThis.selectedProductName);
        localThis.selectedProductResponse.product.quantityInCart =
            localThis._cartService.getQuantityInCartByName(localThis.selectedProductName);
      }
    });
  }

  locationChanged(val: Event) {
    if (val instanceof NavigationEnd && this._location.path() !== '' && val.url.substr(0, 8) === '/product' &&
      this._route.snapshot.queryParams.name) {
      console.log('activated route: ' + this._route.snapshot.queryParams.name);
      this.selectedProductName = this._route.snapshot.queryParams.name;
      this.selectedProductResponse = this._productService.findProductByName(this.selectedProductName);
    }
  }

  getResponseType(): number {
    let ret = FindProductResponseTypes.WaitForList;
    if (this.selectedProductResponse.responseType === FindProductResponseTypes.ProductFound) {
      if (this.selectedProductResponse && this.selectedProductResponse.product &&
          this.selectedProductResponse.product.name === this.selectedProductName) {
        ret = FindProductResponseTypes.ProductFound;
        return ret;
      } else {
        ret = FindProductResponseTypes.ErrorReadingProduct;
        return ret;
      }
    } else if (this.selectedProductResponse.responseType === FindProductResponseTypes.ProductNotFound) {
      ret = FindProductResponseTypes.ProductNotFound;
      return ret;
    } else if (this.selectedProductResponse.responseType === FindProductResponseTypes.WaitForList) {
      ret = FindProductResponseTypes.WaitForList;
      return ret;
    } else if (this.selectedProductResponse.responseType === FindProductResponseTypes.ProductNameIsEmpty) {
      ret = FindProductResponseTypes.ProductNameIsEmpty;
      return ret;
    } else if (this.selectedProductResponse.responseType === FindProductResponseTypes.ErrorReadingProduct) {
      ret = FindProductResponseTypes.ErrorReadingProduct;
      return ret;
    }
    return ret;
  }

  onCounterChange(event: number) {
    this.productQuantity = event;
    console.log('product page onCounterChange: ' + this.productQuantity);
  }

  isDataValid(): boolean {
    if (!this.selectedProductResponse || !this.selectedProductResponse.product || !this.selectedProductName ||
      this.selectedProductResponse.product.name !== this.selectedProductName) {
      return false;
    }
    if (this.productQuantity >= 1) {
      return true;
    } else {
      return false;
    }
  }

  isAddToCartDisabled(): boolean {
    return !this.isDataValid();
  }

  /* rubric44 */
  addToCart() {
    if (this.isDataValid() === false) {
      return;
    }
    console.log('product page addToCart: ' + this.productQuantity);
    const cartProduct = new CartProduct({
      name: this.selectedProductResponse.product.name,
      price: this.selectedProductResponse.product.price,
      quantity: this.productQuantity,
      netSum: 0,
      imagelink: this.selectedProductResponse.product.imagelink
    });
    if (this._cartService.addProduct(cartProduct)) {
      this.selectedProductResponse.product.addToCartMessage = 'success';
      this.selectedProductResponse.product.quantityInCart = 
          this._cartService.getQuantityInCartByName(this.selectedProductResponse.product.name);
      setTimeout(this.showQuantityInCart, 3000, this.selectedProductResponse.product);
    } else {
      this.selectedProductResponse.product.addToCartMessage = 'error';
    }
  }

  showQuantityInCart(product: Product) {
    product.addToCartMessage = '';
  }

  /* rubric45 */
  goBack(): void {
    this._location.back();
  }

  ngOnInit() {}
}
