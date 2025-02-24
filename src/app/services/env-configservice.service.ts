import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { InterfaceConfig } from '../shared/stocker';

@Injectable({
  providedIn: 'root'
})
export class EnvConfigserviceService {

  private readonly backUrl ='assets/config/config.json'
  public static api='';
  private configuration$?: Observable<InterfaceConfig>;

  constructor(private http: HttpClient) { }

  public load():Observable<InterfaceConfig>{
    if(!this.configuration$){
      this.configuration$=this.http.get<InterfaceConfig>(`${this.backUrl}`,{
        headers:{skip_token : 'true'},
      }).pipe(shareReplay(1))
    }
    return this.configuration$;
  }
}
