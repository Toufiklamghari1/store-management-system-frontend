import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AchatsDTO, CategorieDTO, ClientCredit, ClientDTO, Credit, FournisseurCredit, FournisseurDTO, LigneAchatDTO, ProduitDTO, VentesDTO } from 'app/shared/stocker';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:8080';
  private api ='/transaction'

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })
};

  getClients(): Observable<ClientDTO[]> {
    return this.http.get<ClientDTO[]>(`${this.baseUrl}/transaction/getClients`);
  }

  getClientById(id : number) : Observable<ClientDTO>{
    return this.http.get<ClientDTO>(`${this.baseUrl}/transaction/getClientById/${id}`);
  }

  saveClient(client : ClientDTO):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/transaction/saveClient`,client, this.httpOptions);
  }

  getFournisseur(): Observable<FournisseurDTO[]> {
    return this.http.get<FournisseurDTO[]>(`${this.baseUrl}/transaction/getFournisseurs`);
  }

  getFournisseurById(id : number):Observable<FournisseurDTO> {
    return this.http.get<FournisseurDTO>(`${this.baseUrl}/transaction/getFournisseurById/${id}`);
  }

  getAllCategories(): Observable<CategorieDTO[]>{
    return this.http.get<CategorieDTO[]>(`${this.baseUrl}/transaction/getAllCategories`);
  }

  saveAchats( achats : AchatsDTO) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/transaction/saveAchats`,achats, this.httpOptions);
  }

  saveVentes( ventes : VentesDTO) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/transaction/saveVentes`,ventes, this.httpOptions);
  }

  saveProduct(produit : ProduitDTO): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/transaction/saveProduit`,produit, this.httpOptions);
  }

  saveFournisseur(fournisseur : FournisseurDTO):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/transaction/saveFournisseur`,fournisseur, this.httpOptions);
  }

  saveCategorie(categorie : CategorieDTO):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/transaction/saveCategorie`,categorie, this.httpOptions);
  }

  getCategorieByDescription(desc : string):Observable<any>{
    return this.http.get<CategorieDTO[]>(`${this.baseUrl}/transaction/getCategorieByDescription/${desc}`);
  }

  getAllAchats():Observable<any>{
    return this.http.get<CategorieDTO[]>(`${this.baseUrl}/transaction/getAllAchats`);
  }

  getAllVentes():Observable<any>{
    return this.http.get<CategorieDTO[]>(`${this.baseUrl}/transaction/getAllVentes`);
  }
  getCredits(isClient: boolean):Observable<any>{
    let params = new HttpParams().set('isClient', isClient);
    return this.http.get<Credit[]>(`${this.baseUrl}/transaction/getCredits`,{params : params});
  }

  getClientCredits():Observable<any>{
    console.log("getClientCredits")
  this.http.get<ClientCredit[]>(`${this.baseUrl}/transaction/getClientCredits`).subscribe((item) => {
      console.log(item)
     });
    return this.http.get<ClientCredit[]>(`${this.baseUrl}/transaction/getClientCredits`);
  }

  getFournisseurCredits():Observable<any>{
    console.log("getFournisseurCredits")

     this.http.get<FournisseurCredit[]>(`${this.baseUrl}/transaction/getFournisseurCredits`).subscribe((item) => {
      console.log(item)
     });

    return this.http.get<FournisseurCredit[]>(`${this.baseUrl}/transaction/getFournisseurCredits`);
  }

  saveCredit(credit : Credit): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/transaction/saveCredit`,credit, this.httpOptions);
  }

  getAllProduits():Observable<any>{
    return this.http.get<ProduitDTO[]>(`${this.baseUrl}/transaction/getAllProduits`);
  }

  getFournisseurByProduitId(id : number): Observable<any>{
    return this.http.get<CategorieDTO[]>(`${this.baseUrl}/transaction/getFournisseurByProduitId/${id}`);
  }
}
