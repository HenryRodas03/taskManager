import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private API_URL = environment.api_url + '/login';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.API_URL}`, data);
  }
}
