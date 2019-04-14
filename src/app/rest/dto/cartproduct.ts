export class CartProduct {
  name: string;
  price: number;
  quantity: number;
  netSum: number;
  imagelink: string;

  public constructor(init?: Partial<CartProduct>) {
    Object.assign(this, init);
  }
}
