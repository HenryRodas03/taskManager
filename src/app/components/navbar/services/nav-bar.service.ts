import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
 private API_URL = environment.api_url;
 token = localStorage.getItem('accessToken');
 
  constructor(private http: HttpClient) {}

  private _getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token ?? '',
    });
  }

  logOut(data: any) {
    return this.http.post(`${this.API_URL}/logOut`,data, { headers:this._getHeaders() });
  }
}
