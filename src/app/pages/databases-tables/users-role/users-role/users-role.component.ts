import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { GLOBAL_IPS } from '../../../../services/global_ips';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-users-role',
  templateUrl: './users-role.component.html',
  styleUrls: ['./users-role.component.css']
})
export class UsersRoleComponent implements OnInit {

  users: any[] = [];
  public urlProfile: string; 

  constructor(protected usersService: UsersService, private fb: FormBuilder,
    private router: Router) {
      this.urlProfile = GLOBAL_IPS.urlProfile; 
  }

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
