import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { User } from '../../models/user';
import { Rank } from '../../enums/rank';
import { Dependency } from '../../enums/dependency';
import { UpdateProfileService } from '../../services/update-profile.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-myprofile',
  templateUrl: './edit-myprofile.component.html',
  styleUrls: ['./edit-myprofile.component.css']
})
export class EditMyprofileComponent implements OnInit {

  public user: User = new User();
  public rank: Rank;
  public dependency: Dependency;
  ranks: any[];
  dependencies: any[];
  selectedRank: any;
  selectedDependency: any;
  editProfileForm: FormGroup;
  isAlreadyConfig: boolean = false;

  constructor(private authService: AuthService,
    protected usersService: UsersService,
    private fb: FormBuilder,
    private updateProfileService: UpdateProfileService) { }

  ngOnInit() {
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

    this.setParametersUser();
  }

  updateProfile(user: User): void {
    const isEmpty = Object.values(user).some(x => (x == null || x == ''));
    if (isEmpty) {
      swal.fire('Campos vacíos', 'Llene todos los campos para actualizar el perfil.', 'warning')
    } else {
      user = this.configSelectRankDependency(user); 
      this.setParametersUser();
      this.updateProfileService.updateProfile(user)
        .subscribe(response => {
          swal.fire('Usuario actualizado', 'Usuario actualizado con éxito', 'success')
          window.location.reload();
        }, err => {
          if (err.status = 500) {
            swal.fire('Error al actualizar usuario', 'Error interno en el servidor', 'error')
          }
        })
    }
  }

  onSubmitProfile() {
    this.updateProfile(this.user);
    console.log("res:", this.editProfileForm.getRawValue());
  }

  getRank(number: number): any {
    return Rank[number];
  }

  getDependency(number: number): any {
    return Dependency[number];
  }

  setParametersUser(){
    this.getUserById(this.authService.user.uuidUser);
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
    this.editProfileForm.patchValue({
      uuidUser: this.user.uuidUser,
      username: this.user.username,
      password: this.user.password,
      imeiDevice: this.user.imeiDevice,
      name: this.user.name,
      lastName: this.user.lastName,
      callSing: this.user.callSing,
      email: this.user.email,
      job: this.user.job,
      indicative: this.user.indicative,
      rank: this.user.rank,
      dependency: this.user.dependency,
      typeDevice: this.user.typeDevice,
      nameImageProfile: this.user.nameImageProfile,
      roleDTOS: this.user.roleDTOS,
    });
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

  configSelectRankDependency(user: User): User{
    if(this.selectedDependency != null && this.selectedRank != null){
      user.rank = Rank[this.selectedRank];
      user.dependency = Dependency[this.selectedDependency];
      this.isAlreadyConfig = true;
     } 
   if((this.selectedDependency == null && this.selectedRank == null) && !this.isAlreadyConfig){
       this.selectedDependency = user.dependency;
       this.selectedRank = user.rank;
       this.isAlreadyConfig = true;
     }
   if ((this.selectedRank == null) && !this.isAlreadyConfig) {
       this.selectedRank = user.rank;
       user.dependency = Dependency[this.selectedDependency];
       this.isAlreadyConfig = true;
     }
   if ((this.selectedDependency == null) && !this.isAlreadyConfig) {
       this.selectedDependency = user.dependency;
       user.rank = Rank[this.selectedRank];
       this.isAlreadyConfig = true;
     } 
     return user;
  }
  

}
