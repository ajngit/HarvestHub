import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { map, Observable } from 'rxjs';
import { UserData } from '../../../Models/UserData';
import { SaveResponse } from '../../../Models/SaveResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3001'; // Replace with your API URL
  
  constructor(private http :HttpClient) { }

  GetProducts( ): Observable<ProductDetail[]> {
    const url = `${this.apiUrl}/products`;
    return this.http.get<ProductDetail[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  GetProductsByUserID( ID:number): Observable<ProductDetail[]> {
    const url = `${this.apiUrl}/getproductsbyuserid`;
    return this.http.get<ProductDetail[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) ,
      params: new HttpParams().set('UserID', ID.toString())
    });
  }

  GetProductByID( ID:number): Observable<ProductDetail> {
    const url = `${this.apiUrl}/getproduct`;
    return this.http.get<ProductDetail>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) ,
      params: new HttpParams().set('ProductID', ID.toString())
    });
  }

  GetUsers(): Observable<UserData[]> {
    const url = `${this.apiUrl}/user`;
    return this.http.get<UserData[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }


  SaveProduct( data: ProductDetail): Observable<SaveResponse> {
    const url = `${this.apiUrl}/saveProduct`;
    return this.http.post<SaveResponse>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  DeleteProduct(
    ProductID: number
  ): Observable<SaveResponse> {
    let params = new HttpParams();
    params = params.append('ProductID', ProductID);
    return this.http.delete<SaveResponse>(
      this.apiUrl + '/deleteproduct',
      {
        params: params,
      }
    ).pipe(map((response) => response));
  }

}
