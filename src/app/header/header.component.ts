import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service.service';
import { ImeisListService } from '../services/imeis-list.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 
import { GLOBAL_IPS } from '../services/global_ips';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  imeis: any[] = [];

  public urlProfile: string; 

  constructor(protected imeiListService: ImeisListService,
    private authService: AuthService, private router: Router) { 
    this.urlProfile = GLOBAL_IPS.urlProfile;
  }

  logout():void{
    let rank = this.authService.user.rank;
    let lastname = this.authService.user.lastName;
    this.authService.logout();
    swal.fire('Logout', `Hasta luego ${rank} ${lastname}`, 'success');
    this.router.navigate(['/login']);
  }

}
