import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import swal from 'sweetalert2';
import { AuthService } from '../services/auth.service.service';
import { Router } from '@angular/router';
import { LoginUserWebDTO } from '../login/loginUserWeb'
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:string = 'Sign in, please'
  user: User;
  loginUserWebDTO: LoginUserWebDTO;

  constructor(private authService: AuthService, private router: Router) {
    this.user=new User();
    this.loginUserWebDTO = new LoginUserWebDTO();
   }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      swal.fire('Login', `Hola ${this.authService.user.rank} ${this.authService.user.lastname}, ya estás autenticado`, 'info');
      this.router.navigate(['/users']);
      console.log("Enter authService true")
    }
  }

  login():void{
    if(this.loginUserWebDTO.username == null || this.loginUserWebDTO.password == null){
      swal.fire('Error login', 'Username or password empty', 'error')
      return;
    }
      this.authService.login(this.loginUserWebDTO).subscribe(response => {
      this.authService.saveUser(response.access_token, response.uuidUser, response.name, response.lastname, response.rank);
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