import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 
import { GLOBAL_IPS } from '../services/global_ips';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public urlProfile: string; 

  constructor(private authService: AuthService, private router: Router) { 
    this.urlProfile = GLOBAL_IPS.urlProfile;
  }

  logout():void{
    let rank = this.authService.user.rank;
    let lastname = this.authService.user.lastname;
    this.authService.logout();
    swal.fire('Logout', `Bye ${rank} ${lastname}`, 'success');
    this.router.navigate(['/login']);
  }

}
