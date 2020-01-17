import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imei } from './imei';

@Injectable({
  providedIn: 'root'
})
export class ImeiService {

  constructor(protected http: HttpClient) { }


}
