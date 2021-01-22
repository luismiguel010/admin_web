import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ExcelService } from '../../../services/excel.service';
import { User } from 'src/app/models/user';
import { Rank } from '../../../enums/rank';
import { Dependency } from '../../../enums/dependency';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  uuidUsers  = '';
  @Output() buttonClicked = new EventEmitter();

  users: User[] = [];
  rank: Rank;
  dependency: Dependency;

  constructor(protected usersService: UsersService, private excelService:ExcelService) { }

  filterUser = '';

  ngOnInit() {
    this.usersService.getUsersQuemes()
    .subscribe(
      (users) => {
        this.users = users;
    },
    (error) => {
      console.error(error);
    }
    );
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.users, 'users_quemes');
  }

  getRank(number: number): any{
    return Rank[number];
  }

  getDependency(number: number): any{
    return Dependency[number];
  }
}
