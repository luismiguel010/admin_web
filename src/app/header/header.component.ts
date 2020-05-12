import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout():void{
    let rank = this.authService.user.rank;
    let lastname = this.authService.user.lastname;
    this.authService.logout();
    swal.fire('Logout', `Bye ${rank} ${lastname}`, 'success');
    this.router.navigate(['/login']);
  }

}
