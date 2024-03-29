import { Injectable } from '@angular/core';
import { UpdateImeiDTO } from '../modals/update-imei-modal/updateImeiDTO'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { GLOBAL_IPS } from './global_ips';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service.service'

@Injectable({
  providedIn: 'root'
})
export class UpdateImeiModalService {

  private url_admin: string;

  private urlEndPoint: string = 'updateImei';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService) { this.url_admin = GLOBAL_IPS.url_admin;}

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

  updateImei(updateImeiDTO: UpdateImeiDTO) : Observable<any> {
    return this.http.put(this.url_admin + this.urlEndPoint, updateImeiDTO, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }
}
