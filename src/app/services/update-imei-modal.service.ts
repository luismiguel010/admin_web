import { Injectable } from '@angular/core';
import { UpdateImeiDTO } from '../modals/update-imei-modal/updateImeiDTO'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateImeiModalService {

  private urlEndPoint: string = '/admin/updateImei';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  updateImei(updateImeiDTO: UpdateImeiDTO) : Observable<any> {
    return this.http.put(this.urlEndPoint, updateImeiDTO, {headers: this.httpHeaders});
  }
}
