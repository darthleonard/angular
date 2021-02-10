import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('destiny') txtDestiny: ElementRef;

  result: string;
  mockSource: string;
  rows = 25;

  ngOnInit(): void {
    this.result = "";
    this.mockSource = data;
  }

  clearContent() {
    this.result = "";
  }
  
  copyToClipBoard() {
    if (this.txtDestiny) {
      this.txtDestiny.nativeElement.select();
      document.execCommand("copy");
      this.txtDestiny.nativeElement.setSelectionRange(0, 0);
    }
  }

  convert(source: string, className: string) {
    try {
      var myObj = JSON.parse(source);
      this.result = ""
      if(this.isIterable(myObj)) {
        for(let obj of myObj) {
          this.result += this.createClassDefinition(obj, className);
          if(obj !== myObj[myObj.length - 1]) {
            this.result += ', ';
          }
        }
      } else {
        this.result = this.createClassDefinition(myObj, className);
      }
    } catch(error) {
      this.result = error;
    }
  }

  createClassDefinition(obj, className) {
    let properties = "";
    let objProperties = Object.getOwnPropertyNames(obj);
    for(let prop of objProperties) {
      let name = prop;
      let value = this.typeProperty(obj[prop]);
      properties += `\t${ name } = ${ value }`;
      if(prop !== objProperties[objProperties.length - 1]) {
        properties += ",\n";
      }
    }
    return `${ className }\n{\n${ properties }\n}\n`;
  }

  typeProperty(value) {
    if(typeof(value) === 'object') {
      //return JSON.stringify(value);
      return '...';
    }
    if(Number(value) || Number(value) === 0) {
      return value;
    }
    return `"${ value }"`;
  }

  isIterable(obj) {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }
}
