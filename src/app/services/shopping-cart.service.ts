import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from '../shared/models/product';
import {map, take} from 'rxjs/operators';
import {ShoppingCartItem} from '../shared/models/shoppingCartItem';
import {ShoppingCart} from '../shared/models/shoppingCart';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      // @ts-ignore
      map(x => { if (x) return  new ShoppingCart(x.items); else return  new ShoppingCart(); })
    );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId).remove();
  }


  /* PRIVATE METHODS */

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  /// notice: when we want to synchronous and wait for result and deal with that
  /// we can make method to async, and use await symbol for promise methods
  /// otherwise we must use .then method of promise to deal with result
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    // this promise method wait for get result as synchronous.
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: ShoppingCartItem) => {
      const quantity = (item ? (item.quantity || 0) : 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity
      });
    });
  }

}
