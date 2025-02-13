import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  private API_URL = environment.api_url;
  token = localStorage.getItem('accessToken');
  headers:any;

  constructor(private http: HttpClient) {
  }

  private _getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token ?? '',
    });
  }
  
  
  formatParams(data: any){  
    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }
  }

  getTasks(data: any) {
    return this.http.get(`${this.API_URL}/listAllTasks`, { headers:this._getHeaders(), params:data });
  }

  saveOrUpdateTask(data: any){
    return this.http.post(`${this.API_URL}/saveOrUpdateTask`,data, { headers:this._getHeaders() });
  }

}
