import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL_IPS } from './global_ips';
import { User } from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public urlAuth: string;
  public url: string;
  public urlGetToken: string;

  public isAdmin: boolean;

  private _user: User;
  private _token: string;

  constructor(private http: HttpClient) { 
    this.urlAuth = GLOBAL_IPS.urlAuth;
    this.urlGetToken = GLOBAL_IPS.url_get_toke;
  }

  public get user(): User{
    if(this._user != null){
      return this._user;
    } else if(this._user == null && sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user:User):Observable<any>{
    const urlEndpoint = this.urlGetToken;

    const credentials = btoa('testjwtclientid'+':'+'XY7kmzoNzl100');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credentials
  });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  saveUser(accessToken: string):void{
    let payload = this.getDataToken(accessToken);
    this._user = new User();
    this._user.uuidUser = payload.uuid_user;
    this._user.imeiDevice = payload.imei_device;
    this._user.username = payload.user_name;
    this._user.name = payload.name;
    this._user.lastname = payload.last_name;
    this._user.callSing = payload.call_sing;
    this._user.email = payload.email;
    this._user.job = payload.job;
    this._user.rank = payload.rank;
    this._user.dependency = payload.dependency;
    this._user.role = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getDataToken(accessToken: string): any {
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.getDataToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0 && payload.authorities.includes("ADMIN_USER")){
      return true;
    }
    return false;
  }

  logout():void{
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

}

