import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvConfig } from '../shared/EnvConfig';
import { CategorieDTO, ChartProduitData } from '../shared/stocker';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:8080';

  addCategories() {}

  getCategories(): Observable<CategorieDTO[]> {
    return this.http.get<CategorieDTO[]>(`${this.baseUrl}/allCategories`);
  }

  getCountProduitByCategorie() : Observable<ChartProduitData[]>{
    return this.http.get<ChartProduitData[]>(`${this.baseUrl}/categorie/getCountProduitByCategorie`);
  }

}
