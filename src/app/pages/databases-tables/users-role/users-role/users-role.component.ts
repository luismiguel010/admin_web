import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { GLOBAL_IPS } from '../../../../services/global_ips';
import { UpdateRoleService } from '../../../../services/update-role.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateRoleDTO } from './updateRoleDTO'; 
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { error } from 'protractor';
import { User } from '../../../../models/user';
import { UserRole } from '../../../../models/user-role';
import { UserRolesService } from '../../../../services/user-roles.service';
import { Observable, Subject } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { flatMap } from 'rxjs/operators';
import { Rank } from '../../../../enums/rank';
import { Dependency } from '../../../../enums/dependency';

@Component({
  selector: 'app-users-role',
  templateUrl: './users-role.component.html',
  styleUrls: ['./users-role.component.css']
})
export class UsersRoleComponent implements OnInit {

  public rank: Rank;
  public dependency: Dependency;
  public updateRoleDTO: UpdateRoleDTO = new UpdateRoleDTO();
  @Output() buttonClicked = new EventEmitter();
  users: User[] = [];
  usersRole: UserRole[] = [];
  public urlProfile: string; 
  username: string;
  uuid: string;

  constructor(protected usersService: UsersService, private fb: FormBuilder,
    private router: Router, private updateRoleService: UpdateRoleService, private modalService: NgbModal,
     protected userRoleService: UserRolesService) {
      this.urlProfile = GLOBAL_IPS.urlProfile; 
  }

  filterUserRole = '';

  ngOnInit() {
    this.userRoleService.getAllUsersWithRole()
    .subscribe(
      (usersWithRole) => {
        this.usersRole = usersWithRole;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRank(number: number): any{
    return Rank[number];
  }

  getDependency(number: number): any{
    return Dependency[number];
  }

  public updateRole(uuidUser: string): void {
    this.updateRoleDTO.uuidUser = uuidUser;
    console.log(this.updateRoleDTO);
    if (this.updateRoleDTO.uuidUser == null) {
      swal.fire('Error al actualizar role', 'Comuníquese con un administrador', 'error')
      return;
    }

    this.updateRoleService.updateRole(this.updateRoleDTO)
    .subscribe(response => {
      this.router.navigate(['/users'])
      swal.fire('Role actualizado', 'Role actualizado con éxito', 'success')
    }, err => {
      if(err.status == 500){
        swal.fire('Error al actualizar role', 'Comuníquese con un administrador', 'error')
      }
    })

  }

}
