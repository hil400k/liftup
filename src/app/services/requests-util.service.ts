import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestsUtilService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {

  }

  getRequest(path, params?) {
    return this.http.get(`${environment.apiUrl}/${path}`, params)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError((err: any) => {
          if (err.status === 401) {
            this.authService.logout()
            this.router.navigate(['login']);
          }

          return of(err);
        })
      );
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
