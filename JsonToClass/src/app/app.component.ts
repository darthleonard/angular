import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result: string;

  convert(source: string, className: string) {
    try {
      var myObj = JSON.parse(source);
      this.result = ""
      if(this.isIterable(myObj)) {
        for(let obj of myObj) {
          this.result += `${ className } {\n`;
          this.result += this.createProperties(obj);
          this.result += "\n},\n"
        }
      } else {
        //this.result = this.create(myObj) single object
      }
    } catch(error) {
      this.result = error;
    }
  }

  createProperties(obj) {
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
    return properties;
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
