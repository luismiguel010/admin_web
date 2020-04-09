import { Component, OnInit } from '@angular/core';
import { Imei } from './imei';
import { DeleteImeiModalService } from '../../services/delete-imei-modal.service';
import { Router } from '@angular/router'

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
    this.imeiService.deleteImei(this.imei).subscribe(
      response => this.router.navigate(['/users'])
    )
  }

}
