import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ShoppingCartService} from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  placeOrder(order): string {
    const placedOrderKey = this.db.list('/orders').push(order).key;
    this.shoppingCartService.clearCart();
    return placedOrderKey;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', query => {
      return query.orderByChild('userId').equalTo(userId);
    });
  }
}
