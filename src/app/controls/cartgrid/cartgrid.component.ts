import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartProduct } from '../../rest/dto/cartproduct';
import { CartGridRowComponent } from './cartgrid-row/cartgrid-row.component';
import { CartGridRowEvent } from '../../controls/cartgrid/cartgrid-row/cartgrid-row.event';
import { CartGridRowEventTypes } from '../../controls/cartgrid/cartgrid-row/cartgrid-roweventtypes.enum';

@Component({
  selector: 'app-cartgrid',
  templateUrl: './cartgrid.component.html',
  styleUrls: ['./cartgrid.component.css']
})
export class CartGridComponent implements OnInit {
  products: CartProduct[] = <CartProduct[]>[];

  constructor(protected _cartService: CartService) { }

  onRowChange(event: CartGridRowEvent) {
    if (event) {
      if (event.eventType === CartGridRowEventTypes.quantityChanged && (event.quantity > 0 || event.quantity < 0)) {
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
