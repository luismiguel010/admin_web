import { Component, OnInit } from '@angular/core';
import { Imei } from './imei';
import { ImeisListService } from '../../../services/imeis-list.service';
import { DeleteImeiModalService } from '../../../services/delete-imei-modal.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-imeis-list',
  templateUrl: './imeis-list.component.html',
  styleUrls: ['./imeis-list.component.css']
})
export class ImeisListComponent implements OnInit{

  imeis: any[] = [];

  public imei: Imei = new Imei()

  constructor(protected imeiListService: ImeisListService, 
    private imeiService: DeleteImeiModalService, private router: Router) { }

  filterImei = '';

  ngOnInit(): void {
    console.log("onInit");
    this.imeiListService.getImeiList()
    .subscribe(
    (imeis) => {
      this.imeis = imeis;
    },
    (error) => {
      console.error(error);
    }
    );
  }

  public deleteImei(imei: Imei): void{
    this.imei = imei;
    if(this.imei.imeiDevice == null || this.imei.imeiDevice.length == 0){
      swal.fire('Error insert', 'Campo de imei vacío', 'error')
      return;
    }

    this.imeiService.deleteImei(this.imei)
    .subscribe(response => {
        //this.router.navigate(['/users'])
        this.refresh();
        swal.fire('Imei deleted', 'Imei deleted with success','success')
        this.ngOnInit();
      }, err => {
        if(err.status == 500){
          swal.fire('Error al eliminar imei', 'Es posible que el imei no exista', 'error')
        }
      }
    )
  }

  refresh(): void {
    window.location.reload();
  }

}
