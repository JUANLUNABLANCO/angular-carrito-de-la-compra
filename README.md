# CURSO DE ANGULAR COMPONENTES Y DIRECTIVAS:  

https://platzi.com/clases/2486-angular-componentes/41175-bienvenida/
# my-store-app-medium-level

## INSTALACIONES

> node -v                 // v16.17.0
> npm -v                  // 8.15.0
> npm i -g @angular/cli
> ng version              // 16.17.0

## CREAR UN PROYECTO CON EL CLI DE ANGULAR

> ng new my-store-with-angular
> cd my-store-with-angular
> ng serve

visit (http://localhost:4200)

## SOME THINGS OF THIS CLI

### MyStoreWithAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Arrancar el servidor de desarrollo

> ng serve -o                 // servir el proyecto
> ng serve -o --port=3500     //  en el puerto especificado
> ng version
     _                      _                 ____ _     ___ 
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | | 
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | | 
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 15.0.4
Node: 16.17.0
Package Manager: npm 8.15.0
OS: win32 x64

Angular: 15.0.4
... animations, cli, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------       
@angular-devkit/architect       0.1500.4
@angular-devkit/build-angular   15.0.4
@angular-devkit/core            15.0.4
@angular-devkit/schematics      15.0.4
@schematics/angular             15.0.4
rxjs                            7.5.7
typescript                      4.8.4

## Archivos importantes de Configuración

### archivos de configuración de typescript y angular

tsconfig.json
tsconfig.app.json
tsconfig.spec.json


### browser listado de compatibilidades

.browserlistrc


### editor

.editorconfig


### angular

angular.json


### testing

karma.conf.json


### Node version manager

.nvmrc

### Extensiones de VSC

Angular language Service
editor config


## Crear componentes [vídeo-2]

> ng generate component todo
> ng g c components/img

> ng g c componentes/img --skip-tests -is  // sin estilos -is inlineStyles y sin el .spec

creará la sigueinte carpeta con los correpondientes archivos ts| html | scss:

src/app/componets/img/ ...

También lo importó en: 
--- app.module.ts ---
import { ImgComponent } from './components/img/img.component';
...
@NgModule({
  declarations: [
    AppComponent,
    ImgComponent
...
--- ---

## @Input pasar info desde el padre al hijo [vídeo-3]
--- img.component.ts ---
export class ImgComponent {
  @Input() img: string = "valor init"
...
--- ---
--- img.component.html ---
<p>img works!</p>
<h1>{{img}}</h1>
--- app.componet.ts---
...
export class AppComponent {
  imgParent = 'my-store-app-medium-level';
}
--- ---
--- app.component.html ---
<p><input type="text" [(ngModel)]="imgParent"></p>  // padre imgParent es una propiedad de app.component
<app-img [img]="imgParent"></app-img>               // esta propiedad proviene del componente hijo img.component
// que dinámicamente accede a lo que el padre le pasa por parámetro
Como internamente el <app-img, renderiza una '<mg [src]="img">', esta gracias al @inpu() estará pendiente de posibles parámetros pasados en este caso [img]="algo" y ese algo se trasladará ala etiqueta img a su atributo src por ende, si el padre le pasa una url válida de una imagen, lo tomará como la src para renderizar esa imagen
--- ---

salida final
----------------- este es el padre
[my-store-app-medium-level] --> input modificable del padre
----------- este es el hijo
img works!

my-store-app-medium-level --> h1 de img componet
----------  hijo
----------------- padre

## Outputs info del hijo al padre [vídeo-4]

--- img.component.html ---
<img width="200" (error)="errorImgChargue()" [src]="img" alt="un avatar" *ngIf="img; else DefaultImage"

(load)="imgLoaded()" // escuchamos el evento load de la imagen para llamar a imgLoaded

>
<ng-template #DefaultImage>
    <img [src]="imgDefault" alt="una imagen vacía">
</ng-template>
--- ---

no solo se actualiza a imagen por defecto si no viene ninguna, sino que si viene una url que no encuentra lanzara un error, ese error tiene una escucha

en el componente:

--- img.component.ts ---
@Output() loaded = new EventEmitter<string>();  / esto nos permite comunicarnos del hijo hacia el padre emitiendo un evento, que hemos colocado en el html de esta manera (load)="imgLoaded()"
  ...
  imgLoaded() {
    console.log('La imagen cargó! hijo');
    this.loaded.emit(this.img); // aquí se emite el evento llamado 'loaded' cuando cargue y le pasa un string que es la url, el padre debe escuchar este evento para saber cuando el hijo lo emitió
  }
-- ---

en el padre

--- app.component.html --- 
<app-img (loaded)="onLoadedImg($event)" ...
--- ---

e internamente 

--- app.component.ts ---
  onLoadedImg(img: string) {
    console.log('Padre: img: ', img);
  }
--- ---


## reutilizacion de componentes [vídeo-5]

<app-product [product]="product" *ngFor="let product of products"></app-product>
[product] --> viene del ProductComponent

--- product.componet.ts ---
@Input() product: Product = {
    id: '',
    name: '',
    image: '',
    price: 0
  }

en el input() --> podríamos cambiar el nombre aquí inpu('myProduct'), pero n ose suele utilizar
con el ngFor iteramos el array y como ese componente es un product de products, debemos igualarlo a ese
[product]="product", fijate en el for  *ngFor="let product of products", si esto hubiese sido des esta otra forma:

*ngFor="let itemProduct of products" el escuchador del padre [product]="itemProduct"

[product]="product"
el primer [product], es información que se escucha desde el padre, puesto que product es un componente hijo importado, hace referencia esto:
  @Input() product: Product = {
    id: '',
    name: '',
    image: '',
    price: 0
  }
al igualarlo a "product", que viene del padre con información desde un array de products, e itera en cada uno
tomará para cada iteración la info que obtiene del array y que coincide en tipado propuesto en Product.

Así que cuando angular vaya a renderizar el componente product le endosará uno a uno gracias al *ngFor, los datos correspondientes gracias al decorador @input()...


## Ciclo de vida de un componente en angular [video-6]

import { Component, OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

... 

export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{
...
  constructor() {
    // before render, only one time, no Async
    console.log('constructor','img value =>', this.img);
  }
  ngOnChanges() {
    // before render, changes inputs, many times, si cambiamos el componente este sigue estando, los demás solo se ejecutan una vez.
    console.log('ngOnChanges','img value =>', this.img);
  }
  ngOnInit(): void {
    // before render, async here (fetch, promises, api,...), only one time
    console.log('ngOnInit', 'img value =>', this.img);
  }
  ngAfterViewInit(): void {
    // after rendering components,  only one time
    console.log('ngAfterViewInit', 'img value =>', this.img);
  }
  ngOnDestroy(): void {
    // delete component,  only one time
    console.log('ngOnDestroy', 'img value =>', this.img);
  }


## ngOnChange() {} [vídeo-7]

ngOnInit(): void {
    // before render, async here (fetch, promises, api,...), only one time
    console.log('ngOnInit', 'img value =>', this.img);
    window.setInterval(()=>{
      this.counter +=1;
    }, 1000);
  }

intervalX: number | undefined;

ngOnInit(): void {
    // before render, async here (fetch, promises, api,...), only one time
    console.log('ngOnInit', 'img value =>', this.img);
    this.intervalX = window.setInterval(()=>{
      this.counter +=1;
    }, 1000);
  }
  hemos creado un intervalo en el componente, pero al destruirlo el intervalo sigue corriendo cada segundo...

  ngOnDestroy(): void {
    ...
    window.clearInterval(this.intervalX);
  }// hay ciertos eventos que no mueren al destruir un componente: setInterval, observables, etc

-----------------------------------------------------------------------
setInput
[ver de nuevo el vídeo 7], para detectar cambios en  diferentes inputs
-----------------------------------------------------------------------

## lista de productos [video 8, 9] Afectación de Estilos

estilos para cada componente, solo afecta a ese componente.
Si necesitamos alcanzar a un hijo dentro de un componente nos iríamos a los estilos generales  styles.scss y allí haríamos cosas como esta:

--- styles.scss ---
.products--grid {
    app-img {
        img {
            border-radius: 10px;
        }
    }
}
--- ---

## header [video 9]

> ng g c components/nav



## side bar Menu [video 10]

--- nav.component.html ---
<div class="show-mobile">
    <div>
        <button (click)="toggleMenu()">
          <img src="assets/svg/icon_menu.svg" alt="menu">
        </button>
        <a href="">
            <img src="assets/svg/logo_yard_sale.svg" alt="logo">
        </a>
        <a href="">
            <img src="assets/svg/icon_shopping_cart.svg" alt="logo">
        </a>
    </div>
    <div class="side-menu" [class.active]="showMenu">
        <button (click)="toggleMenu()">Close </button>
        <ul>
            <li><a href="">All</a></li>
            <li><a href="">Clothes</a></li>
            <li><a href="">Electronics</a></li>
        </ul>
    </div>
</div>
--- ---
--- nav.component.ts ---
  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
--- ---

observa [class.active]="showMenu" // si showMenu == true se activa la clase si no, no

y con el botón (click)="toggleMenu()", cambiamos el estado de true a false y de flase a true
toggleMenu() {
    this.showMenu = !this.showMenu;
  }



## comunicacion padre / hijo (carrito de compras) [vídeo-11]

crearemos un evento en el hijo que se emitirá cuando el usuario haga click en un botón de añadir al carrito
--- product.component.ts --- 
  import { ..., Output, EventEmitter } from '@angular/core';
  ...
  @Output() addedProduct = new EventEmitter<Product>(); // este es el evento

  addToCart() { // y este el botón que activa el evento
    this.addedProduct.emit(this.product); 
  }
--- ---
--- product.componet.html ---
<button (click)="addToCart()">Add Cart</button>
--- ---

Ahora en el padre vamos a ecuchar el evento addedProduct<Product> // que nos trae un producto objeto completo

--- products.component.html ---
<div class="products--grid">
    <app-product [product]="productItem" *ngFor="let productItem of productsArray" (addedProduct)="addToShoppingCart($event)"></app-product>
</div>
--- ---
--- products.component.ts ---
  addToShoppingCart(product: Product){
    console.log(product);
  }
--- ---

## servicios [vídeo-12] (Patron Inyección de Dependencias)

> ng g s services/store

--- services/store.service.ts ---
import { Injectable } from '@angular/core'; 
import { Product } from '../models/product.model';

// gracias a ngular usamos el (Patron Inyección de Dependencias) sin darnos cuenta implementado estos servicios inyectados a los componentes
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = []; // metodo privado para proteger la accesibilidad, necesitas un getter

  constructor() { }

  addProduct(product: Product) { // añade un producto al carrito
    this.myShoppingCart.push(product);
  }
  getShoppingCart() { // obtiene el listado de los productos añadidos al carrito, es un getter 
    return this.myShoppingCart;
  }
  getTotal() { // obtiene el monto total de los productos que hay en el carrito
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
--- ---

--- components/products/products.component.ts ---
import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service'; // importamos el servicio para usarlo

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = []; // el carrito de la compra
  total = 0;

  productsArray: Product[] = [    // listado de productos de la tienda (ficticios)
    {
      id: '1',
      name: 'Automobil de juguete',
      price: 100,
      image: 'assets/images/album.jpg'
  },
  { ...}];
 

  constructor( private storeService: StoreService) { // se inyecta en el constructor
    this.myShoppingCart = this.storeService.getShoppingCart(); // esto no es asincrono por tanto se puede crear aquí, sinó deberías implementarlo en ngOnInit()
  }

  addToShoppingCart(product: Product){ // método para añadir al carrito un producto usando el servicio
    console.log(product);
    // this.myShoppingCart.push(product); // anteriormente sin el servicio esto era así
    // this.total = this.myShoppingCart.reduce((sum, item)=>{ sum +item.pprice, 0}); // anteriormente sin el servicio esto era así

    // hemos externalizado estas dos lógicas al servcio, creando un código más mantenible y escalable
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}


## Inyección de dependencias [vídeo-13] (Patron Inyección de Dependencias y Patron Singleton)

Angular provee los servicios a través del decorador @Injectable({, con un scope por defecto provideIn: 'root'})

@Injectable({
  providedIn: 'root'
})
export class StoreService {

en el constructor podemos iyectarlo privado o publico dependiendo de nuestra lógica.

Los servicios se crean una sola vez en toda la app, para ser requeridos por los componentes, sin que para ello angular deba crear una instancia del servicio para cada componente, que lo requiera (PATRON SINGLETON)

Los componentes pueden inyectar servicios y los servicios, también pueden inyectar otros servicios, hay que tener cuidao de no hacer inyecciones bidireccionales, de A a B y de B a A.

A Service <-- inyecta B Service
B Service <-- inyecta A Service
A <--> B

Esto de arriba daría un error de referencia circular

## Obteniendo datos de una api [video-14]

módulo http: @angular/common/http

API: fakestoreapi.com  // productos de coña para pruebas

### forma de usarla

fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>console.log(json))

### creando el servicio

> ng g s services/products   // el automáticamente le añade el .service o .component o lo que sea, no debes ponerlo sino tendrías cosas como: productsServiceService

--- products.service.ts ---
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // debe ser importado su modulo padre en app.module.ts, para poder usar este servicio, que nos ofrece angular

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(){

  }
  getAllPorduts() {
    return this.http.get('https://fakestoreapi.com/products'); // fake o mock productos de una api, esto será asíncrono
  }
}
--- ---
--- app.module.ts ---
import { HttpClientModule } from '@angular/common/http';  // este módulo se debe importar para poder usar HttpClient en nuestros servicios
...
@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    ...
    HttpClientModule
  ],
  ...
})
...
--- ---
--- rpoducts.component.ts ---
... teníamos esto un array de productos creado ficticiamente por nosotros, ahora usaremos una API y nuestro servicio de products.service.ts para traerlos aquí


import { ProductsService } from '../../services/products.service.ts' // usaremos esto

  // productsArray: Product[] = [
  //   {
  //     id: '1',
  //     name: 'Automobil de juguete',
  //     price: 100,
  //     image: 'assets/images/album.jpg'
  // },
  // {
  //     id: '2',
  //     name: 'Muñeca de trapo',
  //     price: 180,
  //     image: 'assets/images/toy.jpg'
  // },
  // {
  //     id: '3',
  //     name: 'Pelota de futbol',
  //     price: 120,
  //     image: 'assets/images/house.jpg'
  // },
  // {
  //   id: '4',
  //   name: 'El choto gordo',
  //   price: 120,
  //   image: 'assets/images/bike.jpg'
  // }
  // ];

  // ahora los traeremos de una API, utilizando nuestro servicio
  productsArray: Product[] = [];

  el fichero products.component quedaría así

  --- products.component.ts ---
import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

// este componente usa dos servicios el de lso productos de la tienda y el de los productos que hay en el carrito
import { StoreService } from '../../services/store.service';  // carrito
import { ProductsService } from '../../services/products.service'; // productos de la tienda

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;

  productsArray: Product[] = []; // ahora estará vacío inicialmente hasta recuperarlos del servicio

  // inyectamos todos los servicios siempre en el constructor, aunque para usarlos no siempre será aquí
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
    ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void { // de hecho el servicio 2, es asíncrono y no lo podemos usar en el constructor
    this.productsService.getAllProducts().subscribe(data =>{ // siempre hay que suscribirse a los servicios, puesto que los datos pueden cambiar y angular estará pendiente deesos cambios ?? creo ??
      console.log(data); // puedes ver 20 productos completos en la consola, pero ahora no tenemos los productos, debido a que no los estamos devolviendo de moemento, hasta que no resolvamos el modelo nuestro para hacerlo coincidir con el modelo de la API.
      
      // si vas a la consola del navegador y entras en network/fecth/XHR y recargas verás la petición incluso información en los headers muy detallada
      Request URL: https://fakestoreapi.com/products
      Request Method: GET
      Status Code: 200 
      Remote Address: 188.114.96.5:443
      Referrer Policy: strict-origin-when-cross-origin
      ...
      'Response Headers': {
        'content type': 'application/json; charset=utf-8
        }
      ...
      si vas a la pestaña preview, verás los datos formateados, si vas a response verá los datos sin formato en crudo, como puedes ver es un array de objetos en formato json, [{}.{},{},...], pero no es un array de Product, nuestro modelo, aunque tiene 90% compatibilidad, pues el objeto devuelto por el servcicio contiene casi todos los atributos de nuestro modelo, ¿Cómo le decimos al servicio que nos devuelva eso mismo un array de Product --> Product[] ?

      1º importar el modelo 
      2º en el servicio dentro de get implementemos esto get<Product[]>('...')

      después debes asemejar el modelo al dato recibido, donde nosotros teníamos name la API tiene title, cambia eso en todos los ficheros que corresponda, el error de la consola te ayuda con ello.
      También hay nuevos campos del modelo como: descripotion y category, implementalos.

      Gracias al tipado de typescript podemos obtener un feedback temprano de ese tipo de eerores de tipado.


      con eso bastaría, mira como ha quedado el products.service.ts, más abajo



    });
  }

  addToShoppingCart(product: Product){
    console.log(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
--- ---
--- products.service.ts  ---
...
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(){

  }
  getAllProducts() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
--- ---
y en el products.component hay que realizar este cambio para obtener la data
--- products.component ---
...
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data =>{
      // console.log(data);
      this.productsArray = data; // la igualamos y ya la tenemos
    });
  }
...
--- ---
_______________________________________________________________________________________________________________
NOTA: si no quieres usar esa api puedes usar esta otra de platzi: https://api.escuelajs.co/docs/#/products/ProductsController_getAll, solo que tiene otras informaciones y deberías arreglar el modelo y los componentes que la usan
_______________________________________________________________________________________________________________


## PIPES [vídeo-15]

ver documentación: https://angular.io/guide/pipes

tuberías, entradas  --> transformación --> salidas

<p> Total: {{ total | currency: 'EUR' }}</p> --> resultado  €319.00

<p>today: {{new date() | date: 'yyyy/MM/dd' }}</p> --> resultado 2022/12/28

ver documentación: https://angular.io/guide/pipes

<p>message: {{'mI mEnSaJE'| uppercas }}</p> --> 'MI MENSAJE'


## Construyendo un custom pipe

> ng g p pipes/reverse

--- archivo.pipe.ts ---
import { Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform{
  transform(value: unknow, ...args: unknow): unknow {
    return null;
  }
}
--- ---

te genera automáticamente este archivo y el spec de pruebas.

<p> Title: {{ zapatillas nike | reverse }}</p>  --> ekin sallitapaz 



## Directivas en angular [vídeo-17]

> ng g d directives/highlight

--- archivo.generado.ts ---
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private element: ElementRef) { 
    this.element.nativeElement.style.backgroundColor = 'red';
  }

}
--- ---
--- ecomponente.cualquiera ---
<p appHighlight >{{product.description}}</p>
--- ---

sin embargo si queremos escuchar eventos para actuar, debríamos hacer esto otro

--- highlight.directive.ts ---
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter() { // evento de ratón encima
    this.element.nativeElement.style.backgroundColor = '#cc0000';
    this.element.nativeElement.style.color = '#fff';
  }

  @HostListener('mouseleave') onMouseLeave() { // evento de ratón saliendo del elemento en cuestión
    this.element.nativeElement.style.backgroundColor = '';
    this.element.nativeElement.style.color = '#000';
  }

  constructor(private element: ElementRef) {
    // element.nativeElement.style.backgroundColor = '#cc0000';
    // element.nativeElement.style.color = '#fff';
  }
}
--- ---

## Reactividad y manejo del estado [vídeo-18] (PATRON OBSEVABLE)


State Management Strategy

El concepto de reactividad básica es muy importante en el desarrollo front-end. Se trata del estado de la aplicación con respecto al valor de los datos en cada componente, cómo estos cambian a medida que el usuario interactúa y cómo se actualiza la interfaz.

Problemas en la comunicación de componentes
Cuando pensamos en cómo comunicar un componente padre con su hijo y viceversa, solemos utilizar los decoradores @Input() y @Output().

Pero muchas veces, en aplicaciones grandes, la comunicación de componentes se vuelve mucho más compleja y estas herramientas no alcanzan cuando se necesita enviar información de un componente “hijo” a uno “abuelo”.

![imagen1]('./../resourcesMD/reactividad-basica-angular-01.png')

reactividad basica angular.png
Solución a la comunicación de componentes
Es recomendable implementar un patrón de diseño para mantener el estado de la aplicación centralizado en un único punto, para que todos los componentes accedan a ellos siempre que necesiten. A este punto central se lo conoce como Store.

![imagen2]('./../resourcesMD/reactividad-basica-angular-02.png')


Implementando un store de datos
Los store de datos suelen implementarse haciendo uso de Observables.

Paso 1:
Importa la clase BehaviorSubject desde la librería RxJS, que te ayudará a crear una propiedad observable, a la cual tu componente pueda suscribirse y reaccionar ante ese cambio de estado.

// services/store.service.ts
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Producto[] = [];
  private myCart = new BehaviorSubject<Producto[]>([]);
  public myCart$ = this.myCart.asObservable();

  constructor() { }

  addProducto(producto: Producto): void {
    // El observable emitirá un nuevo valor con cada producto que se agregue al carrito.
    this.myShoppingCart.push(producto);
    this.myCart.next(this.myShoppingCart);
  }

}
Paso 2: Suscribe a cualquier componente que necesites a estos datos, para reaccionar cuando estos cambian.

// components/nav-bar/nav-bar.component.ts
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private sub$!: Subscription;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$
      .subscribe(data => {
        // Cada vez que el observable emita un valor, se ejecutará este código
        console.log(data);
      });
  }
  
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
El lugar más apropiado para esto es en ngOnInit(). No olvides guardar este observable en una propiedad del tipo Subscription para hacer un unsubscribe() cuando el componente sea destruido.

### En nuestro  caso 

... queremos que cuando se añada un producto al carro de la compra, desde el componete product, a través del servcicio store.service esto sea comunicado al carrito que se encunetra dentro del componente nav, podría ser más atómico y este nav estar en otro componente dentro e nav, pero para nuestro caso nos vale.

así que en nav.componet haremos algunas modificaciones y en store.service.ts también

--- store.service ---
import { BehaviorSubject } from 'rxjs';  // PATRON OBSEVABLE
...
private myCart = new BehaviourSubject<Product[]>([]);

myCart$ = this.myCart.asObservable();  // es un observable que escucha cambios

addProduct(product: Product) {
  this.myShoppingCart.push(product);
  this.myCart.next(this.myShoppingCart); // transmitimos los cambios a todos los subscriptores
}
--- ---
--- nav.component.ts ---
import { StoreService } from '../../services/store.service'
...

counter = 0;

constructor(private storeService: StoreService) {}

ngOnInit(): void {
  this.storeService.myCart$.subscribe(products =>{
    this.counter = products.length;
  })
}
--- ---
--- nav.component.html ---
<span class="counter" >{{ counter }}</span>
--- ---

## Aplicar un Linter (buenas prácticas de angular)

> ng lint // comando para revisar el código, sino hay ningún linetr, nos informa de los linters disponibles en angular

Instalaremos este

> ng add @angular-eslint/schematics

Y ahora si podemos ejecutar el comando anterior
> ng lint // ahora analizará el código en busca de errores

al ejecutarlo nos muestra los errores y malas practicas, hay algunos que no se pueden evitar, deberíamos poder deshabilitar el error o el warning de alguna manera

También puedes modificar e implementar tus propias reglas de codificación editando el archivo .eslintrc.json que fue creado en la raíz del proyecto.

## ESLINT EXTENSION

The extension uses the ESLint library installed in the opened workspace folder. If the folder doesn't provide one the extension looks for a global install version. If you haven't installed ESLint either locally or globally do so by running npm install eslint in the workspace folder for a local install or npm install -g eslint for a global install.

On new folders you might also need to create a .eslintrc configuration file. You can do this by either using the VS Code command Create ESLint configuration or by running the eslint command in a terminal. If you have installed ESLint globally (see above) then run eslint --init in a terminal. If you have installed ESLint locally then run .\node_modules\.bin\eslint --init under Windows and ./node_modules/.bin/eslint --init under Linux and Mac.








## produccion con firebase.google

https://console.firebase.google.com/?pli=1

agregar proyecto/...

build/hosting/...

> npm install -g firebase-tools
este paquete es global y sive para trabajar con los servicios de firebase en la nube

> firebase -V
11.18.0

> firebase login

> firebase init

select (Hosting option with cursor keys and spacebar)
select existing proyect, named ('AngularExampleStore')
select public folder to deploi 'public'
Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y
Set up automatic builds and deploys with GitHub? (y/N) n

Firebase initialization complete!
nos ha creado la carpeta public/index.html  lo borramos y modificamos en el 

--- firebase.json ---
{
  "hosting": {
    "public": "dist/my-store-with-angular",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
--- ---
También nos creó este ficherito, con el nombre del proyacto al que pertenece.
--- .firebaserc ---
{
  "projects": {
    "default": "angularexamplestore"
  }
}
--- ---

// compilemos y optimicemos
> ng build
hechas las modificaciones del firebase.json, finalizaremos con etse comando

> firebase deploy

Project Console: https://console.firebase.google.com/project/angularexamplestore/overview
Hosting URL: https://angularexamplestore.web.app




## stack blitz

https://stackblitz.com/edit/angular-ivy-sedmgs?file=src%2Fapp%2Fapp.component.css,src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.module.ts,src%2Fapp%2Frecaps.ts,src%2Finterfaces%2Fproduct.ts


## Angular tools | Angular platform

Angular dev tools extension para el navegador de google chrome


módulos implementados

Forms, PWA, Language Services, Router, Elements, CDK, Universal, Compiler, i18n, Http, Material and CLI

Mirar documentación y ejemplos

