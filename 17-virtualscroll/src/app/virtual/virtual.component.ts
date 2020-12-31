import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css']
})
export class VirtualComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  personas = Array(500).fill(0);

  constructor() { }

  ngOnInit(): void {
  }

  irFinal() {
    this.viewPort.scrollToIndex(this.personas.length);
  }

  irInicio() {
    this.viewPort.scrollToIndex(0);
  }

  irMitad() {
    this.viewPort.scrollToIndex(this.personas.length / 2);
  }

}
