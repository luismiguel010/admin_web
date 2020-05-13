import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import swal from 'sweetalert2';
import { AuthService } from '../services/auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:string = 'Sign in, please'
  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user=new User();
   }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      swal.fire('Login', `Hello ${this.authService.user.rank} ${this.authService.user.lastname}, you're authenticated`, 'info');
      this.router.navigate(['/users']);
      console.log("Enter authService true")
    }
  }

  login():void{
    console.log(this.user);
    if(this.user.username == null || this.user.password == null){
      swal.fire('Error login', 'Username or password empty', 'error')
      return;
    }
    this.authService.login(this.user).subscribe(response => {
      console.log(response);

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      let user = this.authService.user;
      this.router.navigate([('/users')]);
      if(user.role.includes("ADMIN_USER")){
      swal.fire('Login', `Hola ${user.rank} ${user.lastname}`, 'success');
      }else{
        swal.fire('Login', `Hola ${user.rank} ${user.lastname}, no eres usuario administrador de Quemes`, 'error'); 
      }
    },err => {
      if(err.status == 400 || err.status == 403){
        swal.fire('Error login', 'Usuario o contraseña incorrectos', 'error')
      }
    });
  }

}