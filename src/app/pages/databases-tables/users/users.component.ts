import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../services/users.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  uuidUsers  = '';
  @Output() buttonClicked = new EventEmitter();

  users: any[] = [];

  constructor(protected usersService: UsersService) { }

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
}
