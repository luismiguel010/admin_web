import { Injectable } from '@angular/core';
import { UpdatePasswordDTO } from '../modals/update-password-modal/updatePasswordDTO'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { GLOBAL_IPS } from './global_ips';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { AuthService } from '../services/auth.service.service'
import { sha256, sha224 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordModalService {

  private url_admin: string;

  private endPoint: string = 'updatePassword';

  private updatePasswordDTO: UpdatePasswordDTO;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService) {
      this.url_admin = GLOBAL_IPS.url_admin; 
      this.updatePasswordDTO = new UpdatePasswordDTO();
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

    updatePassword(updatePasswordDTO: UpdatePasswordDTO) : Observable<any> {
      this.updatePasswordDTO.username = updatePasswordDTO.username;
      this.updatePasswordDTO.newPassword = sha256(updatePasswordDTO.newPassword);
      return this.http.put(this.url_admin + this.endPoint, this.updatePasswordDTO, {headers: this.addAuthorizationHeader()}).pipe(
        catchError(e => {
          this.isNotAuthorized(e);
          return throwError(e);
        })
      );
    }

  }
