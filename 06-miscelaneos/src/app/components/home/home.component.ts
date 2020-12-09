import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, 
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } 
  from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-ng-style></app-ng-style>

    <app-css></app-css>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, doloribus quos quae aperiam et incidunt beatae impedit est officiis explicabo ratione ex consequatur! Pariatur enim aliquam repellendus culpa dicta veritatis!</p>

    <app-clases></app-clases>

    <p [appResaltado]="'#0F0'">
      Hola mundo
    </p>

    <app-ng-switch></app-ng-switch>
  `,
  styles: [ ]
})
export class HomeComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, 
AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor() {
    console.log('constructor');
  }
  ngOnInit(): void {
    console.log('ngOnInit');
  }
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

}
