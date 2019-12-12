import {Component, OnDestroy} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      // @ts-ignore
      products => this.filteredProducts = this.products = products
    );
  }

  filter(query: string) {
    query = query.toLocaleLowerCase();
    this.filteredProducts = (query) ?
      this.products.filter(
        p => p.title.toLocaleLowerCase().includes(query) ||
        p.category.toLocaleLowerCase().includes(query) ) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
