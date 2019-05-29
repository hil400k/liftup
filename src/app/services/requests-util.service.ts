import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsUtilService {

  constructor(
    private http: HttpClient
  ) {

  }

  getRequest(path, params?) {
    return this.http.get(`${environment.apiUrl}/${path}`, params);
  }

  postRequest(path, params) {
    return this.http.post(`${environment.apiUrl}/${path}`, params);
  }

  putRequest(path, params) {
    return this.http.put(`${environment.apiUrl}/${path}`, params);
  }

  deleteRequest(path) {
    return this.http.delete(`${environment.apiUrl}/${path}`);
  }
}
