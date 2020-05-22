import { Component, OnInit } from '@angular/core';
import { Imei } from './imei';
import { DeleteImeiModalService } from '../../services/delete-imei-modal.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-delete-imei-modal',
  templateUrl: './delete-imei-modal.component.html',
  styleUrls: ['./delete-imei-modal.component.css']
})
export class DeleteImeiModalComponent implements OnInit {

  public imei: Imei = new Imei()

  constructor(private imeiService: DeleteImeiModalService,
    private router: Router) { }

  ngOnInit() {
  }

  public deleteImei(): void{
    if(this.imei.imeiDevice == null || this.imei.imeiDevice.length == 0){
      swal.fire('Error insert', 'Campo de imei vacío', 'error')
      return;
    }

    this.imeiService.deleteImei(this.imei)
    .subscribe(response => {
        this.router.navigate(['/users'])
        swal.fire('Imei deleted', 'Imei deleted with success','success')
      }, err => {
        if(err.status == 500){
          swal.fire('Error al eliminar imei', 'Es posible que el imei no exista', 'error')
        }
      }
    )
  }

}
