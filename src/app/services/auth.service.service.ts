import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL_IPS } from './global_ips';
import { User } from '../models/user';
import { LoginUserWebDTO } from '../login/loginUserWeb';
import { LoginUserWebServer } from '../login/loginUserWebServer'
import { sha256, sha224 } from 'js-sha256';

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
  private _loginUserWebDTO: string;
  private loginUserWebServer: LoginUserWebDTO;

  constructor(private http: HttpClient) {
    this.urlAuth = GLOBAL_IPS.urlAuth;
    this.loginUserWebServer = new LoginUserWebDTO();
  }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(loginUserWebDTO: LoginUserWebDTO): Observable<any> {
    const urlEndpoint = this.urlAuth + 'loginUserWeb';
    const credentials = btoa('testjwtclientid' + ':' + 'XY7kmzoNzl100');
    const headersObject = new HttpHeaders();
    headersObject.append('Authorization', 'Basic ' + credentials);
    headersObject.append('Content-Type', 'application/x-www-form-urlencoded');
    const httpOptions = {
      headers: headersObject
    };
    this.loginUserWebServer.username = loginUserWebDTO.username;
    this.loginUserWebServer.password = sha256(loginUserWebDTO.password);
    return this.http.post<any>(urlEndpoint, this.loginUserWebServer, httpOptions);
  }

  saveUser(accessToken: string, uuidUser: string, name: string, lastname: string, rank: string): void {
    let payload = this.getDataToken(accessToken);
    this._user = new User();
    this._user.uuidUser = uuidUser;
    this._user.username = payload.user_name;
    this._user.name = name;
    this._user.lastname = lastname;
    this._user.rank = rank;
    this._user.role = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getDataToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.getDataToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0 && payload.authorities.includes("ADMIN_USER")) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

}

