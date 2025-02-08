import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SaveResponse } from '../Models/SaveResponse';
import { loginData } from '../Models/loginData';
import { environment } from '../../appsettings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;
  
  constructor(private http :HttpClient) { }

  Authenticate( data: loginData): Observable<SaveResponse> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<SaveResponse>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  DeleteUser(
    UserID: number
  ): Observable<SaveResponse> {
    let params = new HttpParams();
    params = params.append('UserID', UserID);
    return this.http.delete<SaveResponse>(
      this.apiUrl + '/deleteuser',
      {
        params: params,
      }
    ).pipe(map((response) => response));
  }
}
