import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const ws_URL = environment.api_url;

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(protected http: HttpClient) { }

  postData(url: string, dataObject: any): Observable<any> {

    return this.http.post(ws_URL.concat(url), dataObject, httpOptions).pipe(retry(3));
  }

  getData(url: string): Observable<any> {

    return this.http.get<any>(ws_URL.concat(url), httpOptions).pipe(retry(3));
  }

  putData(url: string, dataObject: any): Observable<any> {

    return this.http.put(ws_URL.concat(url), dataObject, httpOptions).pipe(retry(3));
  }

}
