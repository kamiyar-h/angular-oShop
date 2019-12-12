import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ShoppingCartService} from '../../../services/shopping-cart.service';
import {ShoppingCart} from '../../../shared/models/shoppingCart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
