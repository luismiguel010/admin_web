import { Injectable } from '@angular/core';
import { Imei } from '../modals/insert-imei-modal/imei';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InsertImeiModalService {

  private urlEndPoint: string = 'http://192.168.9.57:8085/admin/insertImei';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  insertImei(imei: Imei) : Observable<any> {
    return this.http.post(this.urlEndPoint, imei, {headers: this.httpHeaders});
  }

}
