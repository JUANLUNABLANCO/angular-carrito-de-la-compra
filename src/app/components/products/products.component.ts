import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;

  productsArray: Product[] = [];

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
    ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data =>{
      // console.log(data);
      this.productsArray = data;
    });
  }

  addToShoppingCart(product: Product){
    console.log(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
