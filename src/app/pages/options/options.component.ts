import { Component, OnInit } from '@angular/core';
import { Imei } from './imei';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  private imei: Imei = new Imei();

  constructor() { }

  ngOnInit() {
  }

  public insertImei(): void{
    console.log("Clicked")
    console.log(this.imei)
  }

}
