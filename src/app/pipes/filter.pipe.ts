import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultImeis = [];
    for(const imei of value){
      if(imei.imeiDevice.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultImeis.push(imei);
      };
    };
    return resultImeis;
  }

}
