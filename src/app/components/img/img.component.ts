import { Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnChanges, AfterViewInit, OnDestroy{
  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = "assets/images/default.jpg";
  // counter = 0;
  // intervalX: number | undefined;

  constructor() {
    // before render, only one time, no Async
    console.log('constructor','img value =>', this.img);
  }
  ngOnChanges() {
    // before render, changes inputs, many times, si cambiamos el componente este sigue estando, los demás solo se ejecutan una vez.
    console.log('ngOnChanges','img value =>', this.img);
  }
  // ngOnInit(): void {
    // before render, async here (fetch, promises, api,...), only one time
    // console.log('ngOnInit', 'img value =>', this.img);
    // this.intervalX = window.setInterval(()=>{
    //   this.counter +=1;
    // }, 1000);
  // }
  ngAfterViewInit(): void {
    // after rendering components,  only one time
    console.log('ngAfterViewInit', 'img value =>', this.img);
  }
  ngOnDestroy(): void {
    // delete component,  only one time, justo antes de eliminarlo del html así que this.img todavía existe
    console.log('ngOnDestroy', 'img value =>', this.img);
    // window.clearInterval(this.intervalX);
  }





  imgError() {
    this.img = this.imgDefault;
  }
  imgLoaded() {
    console.log('La imagen cargó! hijo');
    this.loaded.emit(this.img);
  }

}
