import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-cards',
  templateUrl: './users-cards.component.html',
  styleUrls: ['./users-cards.component.css']
})
export class UsersCardsComponent implements OnInit {
  uuidUser = '';
  @Output() buttonClicked = new EventEmitter();
  users: any[] = [];

  constructor(protected usersService: UsersService) { }

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
