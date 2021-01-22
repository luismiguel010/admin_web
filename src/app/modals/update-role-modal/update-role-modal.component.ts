import { Component, OnInit } from '@angular/core';
import { UpdateRoleDTO } from '../../pages/databases-tables/users-role/users-role/updateRoleDTO';
import { UpdateRoleService } from '../../services/update-role.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-update-role-modal',
  templateUrl: './update-role-modal.component.html',
  styleUrls: ['./update-role-modal.component.css']
})
export class UpdateRoleModalComponent implements OnInit {

  public updateRoleDTO: UpdateRoleDTO = new UpdateRoleDTO();

  constructor(private updateRoleService: UpdateRoleService,
    private router: Router) { }

  ngOnInit() {
  }

  public updateRole(): void {

    console.log(this.updateRoleDTO);
    if (this.updateRoleDTO.uuidUser == null) {
      swal.fire('Error al actualizar role', 'Contacta al administrador', 'error')
      return;
    }

    this.updateRoleService.updateRole(this.updateRoleDTO)
      .subscribe(response => {
        this.router.navigate(['/users_role'])
        swal.fire('Role actualizado', 'ROle actualizado con éxito', 'success')
      },err => {
        if(err.status == 500){
          swal.fire('Error al actualizar role', 'Contacte al administrador', 'error')
        }
      }
      )
  }

}
