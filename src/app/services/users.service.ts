import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { GLOBAL_IPS } from './global_ips'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url_audit: string;

  constructor(protected http: HttpClient) { 
    this.url_audit = GLOBAL_IPS.url_audit;
  }

  getUsersQuemes(): Observable<any>{
    return this.http.get(this.url_audit + 'getUsers');
  }

}
