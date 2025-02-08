import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate } from '../Models/Authenticate';
import { SaveResponse } from '../../../Models/SaveResponse';
import { environment } from '../../../../appsettings';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

 

  // Method to post data to the API
  SaveUser( data: Authenticate): Observable<SaveResponse> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<SaveResponse>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  GetUser(UserID:number): Observable<Authenticate> {
    const url = `${this.apiUrl}/getuserdetails`;
     return  this.http.get<Authenticate>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) ,
      params: new HttpParams().set('UserID', UserID.toString())
    });
  }

  GetUserList(): Observable<Authenticate[]> {
    const url = `${this.apiUrl}/user`;
     return  this.http.get<Authenticate[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Method to update data on the API
  // updateData(endpoint: string, data: any): Observable<any> {
  //   const url = `${this.apiUrl}/${endpoint}`;
  //   return this.http.put<any>(url, data, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   });
  // }

  // // Method to delete data from the API
  // deleteData(endpoint: string): Observable<any> {
  //   const url = `${this.apiUrl}/${endpoint}`;
  //   return this.http.delete<any>(url);
  }
