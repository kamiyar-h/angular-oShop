import {ShoppingCartItem} from './shoppingCartItem';
import {Product} from './product';


export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: {[productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};

    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, key: productId }));
    }
  }

  get totalPrice(): number {
    let sum = 0;
    for (const productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount(): number {
    let count = 0;
    for (const productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;

    return count;
  }

  public getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}
