import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { GLOBAL_IPS } from '../../services/global_ips';
import { UpdateImeiModalService } from '../../services/update-imei-modal.service';
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
  users: any[] = [];
  public urlProfile: string; 
  public rank: Rank;
  ranks: any[];
  public dependencys: Dependency[];

  constructor(protected usersService: UsersService, private updateImeiService: UpdateImeiModalService,
    private fb: FormBuilder, private modalService: NgbModal,
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

    console.log(this.updateImeiDTO);
    if (this.updateImeiDTO.username == null || this.updateImeiDTO.newImei == null) {
      swal.fire('Error al actualizar imei', 'Nuevo imei o número de celular vacíos', 'error')
      return;
    }

    this.updateImeiService.updateImei(this.updateImeiDTO)
      .subscribe(response => {
        this.router.navigate(['/users'])
        swal.fire('Imei actualizado', 'Imei actualizado con éxito', 'success')
      },err => {
        if(err.status == 500){
          swal.fire('Error al actualizar imei', 'Es posible que el imei a actualizar ya exista', 'error')
        }
      }
      )
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

   openModalProfile(targetModal, user){
    this.ranks = Object.keys(Rank).filter((item) => {
      return isNaN(Number(item));
    });
    console.log(this.ranks)
    this.user = user;
     this.modalService.open(targetModal, {
       centered: true,
       backdrop: 'static'
     });
     this.editProfileForm.patchValue({
       username: user.username,
     });
   }

   onSubmitUpdate() {
    this.updateImei(this.user.username);
    this.modalService.dismissAll();
    console.log("res:", this.editUpdateForm.getRawValue());
   }

   onSubmitProfile(){
     this.modalService.dismissAll();
     console.log("res:", this.editProfileForm.getRawValue());
   }



}
