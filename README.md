# CURSO DE ANGULAR COMPONENTES Y DIRECTIVAS: 
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


## Crear componentes

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

## @Input pasar info desde el padre al hijo
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

## Outputs info del hijo al padre

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


## reutilizacion de componentes

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


## Ciclo de vida de un componente en angular [video]=6

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


## ngOnChange() {}

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



## comunicacion padre / hijo (carrito de compras)

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

## servicios

> ng g s services/store

import { Injectable } from '@angular/core';

@Injectable({  // decorador se puede injectar en otros componentes o servicios
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
}



## Inyección de dependencias

Angular provee los servicios a través del decorador un scope por defecto {provideIn: 'root'}
en el constructor podemos iyectarlo privado o publico dependiendo de nuestra lógica.

Los servicios se crean una sola vez en toda la app, para ser requeridos por los componentes, sin que para ello angular deba crear una instancia del servicio para cada componente PATRON SINGLETON









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

