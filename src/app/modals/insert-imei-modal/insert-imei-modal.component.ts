import { Component, OnInit } from '@angular/core';
import { Imei } from './imei';

@Component({
  selector: 'app-insert-imei-modal',
  templateUrl: './insert-imei-modal.component.html',
  styleUrls: ['./insert-imei-modal.component.css']
})
export class InsertImeiModalComponent implements OnInit {

  private imei: Imei = new Imei()

  constructor() { }

  ngOnInit() {
  }

  public insertImei(): void{
    console.log("Clicked!")
    console.log(this.imei)
  }

}
