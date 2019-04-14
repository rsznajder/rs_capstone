import { CartGridRowEventTypes } from './cartgrid-roweventtypes.enum';
import { CartProduct } from '../../../rest/dto/cartproduct';

export class CartGridRowEvent {
    product: CartProduct;
    quantity: number;
    eventType: CartGridRowEventTypes;

    constructor(product: CartProduct, quantity: number, eventType: CartGridRowEventTypes) {
        this.product = product;
        this.quantity = quantity;
        this.eventType = eventType;
    }
}
