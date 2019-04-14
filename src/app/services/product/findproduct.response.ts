import { Product } from '../../rest/dto/product';
import { FindProductResponseTypes } from './findproduct-responsetypes.enum';

export class FindProductResponse {
  product: Product;
  responseType: FindProductResponseTypes;

  constructor(product: Product, responseType: FindProductResponseTypes) {
    this.product = product;
    this.responseType = responseType;
  }
}
