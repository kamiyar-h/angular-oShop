import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../shared/models/product';
import {switchMap} from 'rxjs/operators';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Observable, Subscription} from 'rxjs';
import {ShoppingCart} from '../../shared/models/shoppingCart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProdcuts();
  }

  private populateProdcuts() {
    this.productService
      .getAll()
      .pipe(switchMap(
        products => {
          // @ts-ignore
          this.products = products;
          return this.route.queryParamMap;
        }
      )).subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

}
