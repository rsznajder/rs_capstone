import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartProduct } from '../../rest/dto/cartproduct';
import { CartGridRowComponent } from './cartgrid-row/cartgrid-row.component';
import { CartGridRowEvent } from '../../controls/cartgrid/cartgrid-row/cartgrid-row.event';
import { CartGridRowEventTypes } from '../../controls/cartgrid/cartgrid-row/cartgrid-roweventtypes.enum';

/* rubric47 */
@Component({
  selector: 'app-cartgrid',
  templateUrl: './cartgrid.component.html',
  styleUrls: ['./cartgrid.component.css']
})
export class CartGridComponent implements OnInit {
  products: CartProduct[] = <CartProduct[]>[];

  constructor(protected _cartService: CartService) { }

  /* rubric53, rubric54 - we modify Cart products here, update and remove
    I use the fact that Cart is a singleton and exists in app-module scope, so I don't need
    to reemit to cart page component. Cart page component receives changes whenever Cart has been changed
    thanks to dependency injection of Cart service.
    This code means that cartgrid component is a fully specialized one not a general grid with active rows.
  */
  onRowChange(event: CartGridRowEvent) {
    if (event) {
      if (event.eventType === CartGridRowEventTypes.quantityChanged && (event.quantity > 0 || event.quantity < 0)) {
        /* rubric55 */
        this._cartService.modifyProduct(event.product, event.quantity);
      } else {
        if (event.product) {
          this._cartService.deleteProduct(event.product);
        }
      }
    }
    console.log('onRowChange: ' + event);
  }

  cartIsEmpty(): boolean {
    return false;
    /*if (this._cartService.productInCartList.length > 0) {
      return false;
    } else {
      return true;
    }*/
  }

  ngOnInit() {}
}
