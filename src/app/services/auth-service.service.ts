import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  private api ='/api'

  isLogged = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    console.log(this.baseUrl);
    //const params = new HttpParams().set('username', username).set('password', password);
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log(password);

    const loginRequest = {'username': username,'password': password};
    return this.http.post<any>(`${this.baseUrl+this.api}/auth`, loginRequest
    ).pipe(
      map(response => {
        console.log('accessToken >>>>'+loginRequest);
        sessionStorage.setItem('token', btoa(username + ':' + password));
        return true;
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
   const token = sessionStorage.getItem('token');
   return token !== null;
  }
}
