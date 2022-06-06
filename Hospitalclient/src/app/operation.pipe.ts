import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'operation'
})
export class OperationPipe implements PipeTransform {

  transform(value, _args:string[]):any {
    let keys = [];
    for (let key in value) {
     
        keys.push({key: key, value: value[key]});
    }
    return keys;
}

}
