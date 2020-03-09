import { Injectable } from '@angular/core';
import { Imei } from '../modals/delete-imei-modal/imei';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeleteImeiModalService {

  private urlEndPoint: string = '/admin/deleteImei';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  deleteImei(imei: Imei) : Observable<any>{
    return this.http.put(this.urlEndPoint, imei, {headers: this.httpHeaders});
  }

}
