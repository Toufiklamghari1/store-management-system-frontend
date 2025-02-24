import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitDTO } from '../shared/stocker';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  addProduit(produit : ProduitDTO){

  }

  getProduits(): Observable<ProduitDTO[]> {
    return this.http.get<ProduitDTO[]>(this.baseUrl+'/produits/getAllProduct');
  }




}
