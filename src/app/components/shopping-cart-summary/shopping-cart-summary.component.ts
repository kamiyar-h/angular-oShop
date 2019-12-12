import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from '../../shared/models/shoppingCart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart: ShoppingCart;
}
