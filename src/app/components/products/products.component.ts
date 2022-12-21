import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;

  productsArray: Product[] = [
    {
      id: '1',
      name: 'Automobil de juguete',
      price: 100,
      image: 'assets/images/album.jpg'
  },
  {
      id: '2',
      name: 'Muñeca de trapo',
      price: 180,
      image: 'assets/images/toy.jpg'
  },
  {
      id: '3',
      name: 'Pelota de futbol',
      price: 120,
      image: 'assets/images/house.jpg'
  },
  {
    id: '4',
    name: 'El choto gordo',
    price: 120,
    image: 'assets/images/bike.jpg'
  }
  ];

  constructor( private storeService: StoreService) {
    this.myShoppingCart = this.storeService.getShoppingCart(); // esto no es asincrono por tanto se puede crear aquí, sinó deberías implementarlo en ngOnInit()
  }

  addToShoppingCart(product: Product){
    console.log(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
