import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsersRole'
})
export class FilterUsersRolePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultUsersRole = [];
    for(const userRole of value){
      if(userRole.lastname.toLowerCase().indexOf(arg.toLowerCase()) > -1 || userRole.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
      userRole.rank.toLowerCase().indexOf(arg.toLowerCase()) > -1 || userRole.dependency.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      userRole.role.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultUsersRole.push(userRole);
      };
    };
    return resultUsersRole;
  }

}