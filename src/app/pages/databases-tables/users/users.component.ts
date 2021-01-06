import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'


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
