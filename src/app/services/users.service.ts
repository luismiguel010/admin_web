import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GLOBAL_IPS } from './global_ips';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { AuthService } from '../services/auth.service.service'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url_audit: string;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(protected http: HttpClient, private router: Router,
    private authService: AuthService) { 
    this.url_audit = GLOBAL_IPS.url_audit;
  }

  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNotAuthorized(e): boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  } 

  getUsersQuemes(): Observable<any>{
    return this.http.get(this.url_audit + 'getUsers', {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

  getUserById(uuidUser: string): Observable<any>{
    return this.http.get(this.url_audit + 'getUserById/'+uuidUser, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    )
  }

}
