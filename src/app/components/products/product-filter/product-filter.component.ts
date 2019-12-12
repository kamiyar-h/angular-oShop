import {Component, Input, OnInit} from '@angular/core';
import {ProductCategoryService} from '../../../services/product-category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;

  constructor(
    private productCategory: ProductCategoryService) {

    this.categories$ = this.productCategory.getAll();
  }

  ngOnInit() {
  }

}
