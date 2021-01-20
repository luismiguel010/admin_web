import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { GLOBAL_IPS } from '../../services/global_ips';
import { UpdateImeiModalService } from '../../services/update-imei-modal.service';
import { UpdateProfileService } from '../../services/update-profile.service';
import { FormGroup, FormBuilder, FormGroupName } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateImeiDTO } from '../../modals/update-imei-modal/updateImeiDTO';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { User } from '../../models/user';
import { Rank } from '../../enums/rank';
import { Dependency } from '../../enums/dependency';

@Component({
  selector: 'app-users-cards',
  templateUrl: './users-cards.component.html',
  styleUrls: ['./users-cards.component.css']
})
export class UsersCardsComponent implements OnInit {
  title = 'modal2';
  editUpdateForm: FormGroup;
  editProfileForm: FormGroup;
  public updateImeiDTO: UpdateImeiDTO = new UpdateImeiDTO();
  public user: User = new User();
  @Output() buttonClicked = new EventEmitter();
  users: User[] = [];
  public urlProfile: string;
  public rank: Rank;
  ranks: any[];
  public dependency: Dependency;
  dependencies: any[];
  selectedRank: string;
  selectedDependency: string;

  constructor(protected usersService: UsersService, private updateImeiService: UpdateImeiModalService,
    private fb: FormBuilder, private modalService: NgbModal,
    private router: Router, private updateProfileService: UpdateProfileService) {
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

    this.editUpdateForm = this.fb.group({
      username: [''],
    });

    this.editProfileForm = this.fb.group({
      username: [''],
      name: [''],
      lastname: [''],
      callSing: [''],
      email: [''],
      job: [''],
      rank: [''],
      dependency: [''],
    });
  }

  public updateImei(username: string): void {
    this.updateImeiDTO.username = username;
    if (this.updateImeiDTO.username == null || this.updateImeiDTO.newImei == null) {
      swal.fire('Error al actualizar imei', 'Nuevo imei o número de celular vacíos', 'error')
      return;
    }

    this.updateImeiService.updateImei(this.updateImeiDTO)
      .subscribe(response => {
        this.router.navigate(['/users'])
        swal.fire('Imei actualizado', 'Imei actualizado con éxito', 'success')
      }, err => {
        if (err.status == 500) {
          swal.fire('Error al actualizar imei', 'Es posible que el imei a actualizar ya exista', 'error')
        }
      }
      )
  }

  updateProfile(user: User): void {
    const isEmpty = Object.values(user).some(x => (x == null || x == ''));
    if (isEmpty) {
      swal.fire('Campos vacíos', 'Llene todos los campos para actualizar el perfil.', 'warning')
    } else {
      if(this.selectedRank == null){
        this.selectedRank = user.rank;
        user.dependency = Dependency[this.selectedDependency];
      }else if(this.selectedDependency == null){
        this.selectedDependency = user.dependency;
        user.rank = Rank[this.selectedRank];
      }else{
        user.rank = Rank[this.selectedRank];
        user.dependency = Dependency[this.selectedDependency];
      }
      this.updateProfileService.updateProfile(user)
        .subscribe(response => {
          this.modalService.dismissAll();
          this.router.navigate(['/users'])
          swal.fire('Usuario actualizado', 'Usuario actualizado con éxito', 'success')
          window.location.reload();
        }, err => {
          if (err.status = 500) {
            swal.fire('Error al actualizar usuario', 'Error interno en el servidor', 'error')
          }
        })
    }
  }

  openModalUpdate(targetModal, user) {
    this.user = user;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.editUpdateForm.patchValue({
      username: user.username,
    });
  }

  openModalProfile(targetModal, user) {
    this.getUserById(user.uuidUser);
    this.ranks = Object.keys(Rank).filter((item) => {
      return isNaN(Number(item));
    });
    this.ranks = this.ranks.filter(function (selection) {
      return selection !== "Selection";
    });
    this.dependencies = Object.keys(Dependency).filter((item) => {
      return isNaN(Number(item));
    })
    this.dependencies = this.dependencies.filter(function (selection) {
      return selection !== "Selection";
    });
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.editProfileForm.patchValue({
      uuidUser: user.uuidUser,
      username: user.username,
      password: user.password,
      imeiDevice: user.imeiDevice,
      name: user.name,
      lastName: user.lastName,
      callSing: user.callSing,
      email: user.email,
      job: user.job,
      indicative: user.indicative,
      rank: user.rank,
      dependency: user.dependency,
      typeDevice: user.typeDevice,
      nameImageProfile: user.nameImageProfile,
      roleDTOS: user.roleDTO,
    });
  }

  onSubmitUpdate() {
    this.updateImei(this.user.username);
    this.modalService.dismissAll();
    console.log("res:", this.editUpdateForm.getRawValue());
  }

  onSubmitProfile() {
    this.updateProfile(this.user);
    console.log("res:", this.editProfileForm.getRawValue());
  }

  getUserById(uuidUser: string): void {
    this.usersService.getUserById(uuidUser)
      .subscribe(userResponse => {
        this.user = userResponse;
      }, err => {
        if (err.status = 500) {
          swal.fire('Error al obtener los datos del usuario', 'Error interno en el servidor', 'error')
        }
      }
      )
  }

  getRank(number: number): any{
    return Rank[number];
  }

  getDependency(number: number): any{
    return Dependency[number];
  }



}
