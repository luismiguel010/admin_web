import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultUsers = [];
    for(const user of value){
      if(user.lastName.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
      user.rank.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.uuidEmail.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
      user.callSing.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.uuidJob.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      user.dependency.toLowerCase().indexOf(arg.toLowerCase()) > -1 || user.username.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultUsers.push(user);
      };
    };
    return resultUsers;
  }

}
