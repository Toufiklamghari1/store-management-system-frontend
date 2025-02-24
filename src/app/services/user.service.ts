import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseURL:string = "http://localhost:8080/";
  authenticate(inputDate:any):Observable<any>{
      console.log("hello user "+ inputDate);

    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(inputDate);
    console.log(body)
    return this.http.post(this.baseURL + 'login', body,{'headers':headers, withCredentials:true})
     // return this.http.post("http://localhost:8080/login",{"username": inputDate.username, "password": inputDate.password},{responseType: 'json'});
  }

  isLogin(){
    return localStorage.getItem('token') != null;
  }
  getToken(){
    return localStorage.getItem('token') !=null ? localStorage.getItem('token') : '';
  }
}
