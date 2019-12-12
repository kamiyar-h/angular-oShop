import { Component } from '@angular/core';
import {ProductCategoryService} from '../../../services/product-category.service';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product: Product = new Product();
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService) {

    this.categories$ = productCategoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.productService.get(this.id).pipe(
      take(1)
    ).subscribe((product: Product) => this.product = product); }

  }

  save(product) {
    if (this.id) {this.productService.update(this.id, product); } else { this.productService.create(product); }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if ( !confirm('are you sure to want delete this product?') ) { return; }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);

  }

}
