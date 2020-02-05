import { Component, OnInit } from '@angular/core';
import { UpdateImeiDTO } from './updateImeiDTO';
import { UpdateImeiModalService } from '../../services/update-imei-modal.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-update-imei-modal',
  templateUrl: './update-imei-modal.component.html',
  styleUrls: ['./update-imei-modal.component.css']
})
export class UpdateImeiModalComponent implements OnInit {

  public updateImeiDTO: UpdateImeiDTO = new UpdateImeiDTO();
 
  constructor(private updateImeiService: UpdateImeiModalService,
    private router: Router) { }

  ngOnInit() {
  }

  public updateImei(): void{
    this.updateImeiService.updateImei(this.updateImeiDTO).subscribe(
      response => this.router.navigate(['/users'])
    )
  }

}
