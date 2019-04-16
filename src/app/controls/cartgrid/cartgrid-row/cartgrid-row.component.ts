import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/rest/dto/cartproduct';
import { CartGridRowEvent } from './cartgrid-row.event';
import { CartGridRowEventTypes } from './cartgrid-roweventtypes.enum';

/* rubric47 */
@Component({
  selector: '[app-cartgrid-row]',
  templateUrl: './cartgrid-row.component.html',
  styleUrls: ['./cartgrid-row.component.css']
})
export class CartGridRowComponent implements OnInit {
  @Input() product: CartProduct;
  @Output() private rowChange = new EventEmitter<CartGridRowEvent>();
  productQuantity = 0;

  constructor() { }

  /* rubric53 - reemits an update event to parent */
  onCounterChange(event: number) {
    if (event && event > 0) {
      this.productQuantity = <number>event;
      const productClone = <CartProduct>Object.assign({}, this.product);
      this.rowChange.emit(new CartGridRowEvent(productClone, event, CartGridRowEventTypes.quantityChanged));
    }
    console.log('product ' + this.product.name + ' onCounterChange: ' + this.productQuantity);
  }

  /* rubric53, rubric54 - reemits a remove event to parent */
  onRemoveClick() {
    const productClone = <CartProduct>Object.assign({}, this.product);
    this.rowChange.emit(new CartGridRowEvent(productClone, null, CartGridRowEventTypes.rowRemoved));
    console.log('product ' + this.product.name + ' remove ');
  }

  ngOnInit() {
    if (this.product) {
      this.productQuantity = this.product.quantity;
    }
  }
}
