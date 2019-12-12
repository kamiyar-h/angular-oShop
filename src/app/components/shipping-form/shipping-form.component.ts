import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {OrderService} from '../../services/order.service';
import {ShoppingCart} from '../../shared/models/shoppingCart';
import {Shipping} from '../../shared/models/shipping';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: Shipping = new Shipping();
  subscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const orderId = this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', orderId]);
  }
}
