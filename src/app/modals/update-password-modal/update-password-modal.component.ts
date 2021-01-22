import { Component, OnInit, Input } from '@angular/core';
import { UpdatePasswordDTO } from './updatePasswordDTO';
import { UpdatePasswordModalService } from 'src/app/services/update-password-modal.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-update-password-modal',
  templateUrl: './update-password-modal.component.html',
  styleUrls: ['./update-password-modal.component.css']
})
export class UpdatePasswordModalComponent implements OnInit {

  public updatePasswordDTO: UpdatePasswordDTO = new UpdatePasswordDTO();

  constructor(private updatePasswordService: UpdatePasswordModalService,
    private router: Router) { }

  ngOnInit() {
  }

  public updatePassword(): void {

    console.log(this.updatePasswordDTO);
    if (this.updatePasswordDTO.username == null || this.updatePasswordDTO.newPassword == null) {
      swal.fire('Error al actualizar contraseña', 'Nuevo contraseña o número de celular vacíos', 'error')
      return;
    }

    this.updatePasswordService.updatePassword(this.updatePasswordDTO)
      .subscribe(response => {
        //this.router.navigate(['/users'])
        window.location.reload();
        swal.fire('Contraseña actualizada', 'Contraseña actualizado con éxito', 'success')
      },err => {
        if(err.status == 500){
          swal.fire('Error al actualizar contraseña', 'Es posible que el usuario no exista', 'error')
        }
      }
      )
  }

}
