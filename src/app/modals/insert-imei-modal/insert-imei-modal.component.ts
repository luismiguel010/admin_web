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
    this.imeiService.insertImei(this.imei)
    .subscribe(responde => {
      this.router.navigate(['/users'])
      swal.fire('Imei inserted', 'Imei insert with success', 'success')
      }
    )
  }

}
