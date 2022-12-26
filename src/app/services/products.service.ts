import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() { // https://api.escuelajs.co/api/v1/products?limit=50&offset=0
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
}
