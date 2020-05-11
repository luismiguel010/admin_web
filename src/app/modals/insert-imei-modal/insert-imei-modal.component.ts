import { Component, OnInit } from '@angular/core';
import { Imei } from './imei';
import { InsertImeiModalService } from '../../services/insert-imei-modal.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-insert-imei-modal',
  templateUrl: './insert-imei-modal.component.html',
  styleUrls: ['./insert-imei-modal.component.css']
})
export class InsertImeiModalComponent implements OnInit {

  public imei: Imei = new Imei()

  constructor(private imeiService: InsertImeiModalService,
    private router: Router) { }

  ngOnInit() {
  }

  public insertImei(): void{
    console.log(this.imei);
    if(this.imei.imeiDevice == null){
      swal.fire('Error insert', 'Imei empty', 'error')
      return;
    }

    this.imeiService.insertImei(this.imei)
    .subscribe(responde => {
      this.router.navigate(['/users'])
      swal.fire('Imei inserted', 'Imei insertado con éxito', 'success')
      },err => {
        if(err.status == 500){
          swal.fire('Error insert imei', 'Es posible que el imei ya exista', 'error')
        }
      }
    )
  }

}
