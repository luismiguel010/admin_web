import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Imei } from './imei';
import { ImeisListService } from '../../services/imeis-list.service';
import { InsertImeiModalService } from '../../services/insert-imei-modal.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-insert-imei-modal',
  templateUrl: './insert-imei-modal.component.html',
  styleUrls: ['./insert-imei-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InsertImeiModalComponent implements OnInit{

  imeis: any[] = [];

  public imei: Imei = new Imei()

  constructor(protected imeiListService: ImeisListService,
    private imeiService: InsertImeiModalService,
    private router: Router) { }

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

  public insertImei(): void{
    if(this.imei.imeiDevice == null){
      swal.fire('Error insert', 'Campo de imei vacío', 'error')
      return;
    }
    this.imeiService.insertImei(this.imei)
    .subscribe(responde => {
      this.router.navigate(['/users'])
      swal.fire('Imei registrado', 'Imei registrado con éxito', 'success')
      this.ngOnInit();
      },err => {
        if(err.status == 500){
          swal.fire('Error al registrar imei', 'Es posible que el imei ya exista', 'error')
        }
      }
    )
  }
}
