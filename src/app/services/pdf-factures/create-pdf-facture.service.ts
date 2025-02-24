import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AchatFactureRequest, ClientDTO } from 'app/shared/stocker';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreatePdfFactureService {
  private baseUrl = 'http://localhost:8080';
  private api = '/transaction';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };
  createFactureAchat(factureRequest : AchatFactureRequest): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/pdf/createFactureAchat`,factureRequest,
      this.httpOptions
    );
  }

  createFactureVente(factureRequest : AchatFactureRequest): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/pdf/createFactureVente`,factureRequest,
      this.httpOptions
    );
  }
}
