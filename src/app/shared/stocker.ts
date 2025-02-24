export interface InterfaceConfig{
  api:string;
  urlBack:string;
}

export class user{
  id : number;
  nom : string;
  prenom :string;
  email :string;
}

export class ProduitDTO{
  libelle: string ;
  prixUnitaire: number;
  categorie: CategorieDTO;
  nbrArticles:number;
}

export class CategorieDTO{
  idCategorie : number;
  description : string;
}

export class LigneAchatDTO{
  produit : ProduitDTO ;
  quantite : number;

  constructor(prod : ProduitDTO, qt: number){
    this.produit=prod;
    this.quantite=qt;
  }
}

export class LigneVenteDTO{
  produit : ProduitDTO ;
  quantite : number;

  constructor(prod : ProduitDTO, qt: number){
    this.produit=prod;
    this.quantite=qt;
  }
}

export class AchatsDTO{
  achatId : number;
  idFournisseur: number;
  ligneAchats : LigneAchatDTO [] ;
  total: number;
  achatDate : Date;
}

export class VentesDTO{
  venteId : number;
  idClient: number;
  ligneVentes : LigneVenteDTO [] ;
  total: number;
  venteDate : Date;
}



export class ClientDTO{
  clientId : number;
	nom : string;
	prenom :string ;
	adresse : string;
	numeroTele : string;
}

export class FournisseurDTO{
  idFournisseur : number;
	nom : string;
	prenom :string ;
	adresse : string;
	numeroTele : string;
}
export class AchatFactureRequest{
  achatRef : string;
  fournisseurName : string;
  total : number;
  achatDate : Date;
  ligneAchat : LigneAchatDTO [] ;
}

export class ChartProduitData {
    name : string;
	  value : number;
}


export interface Notification {
  message: string;
  type: string;
}


export class Credit{
  id : number;
	amount : number;
	date : Date ;
	client : ClientDTO;
	fournisseur : FournisseurDTO;
  isPaid : boolean;
}

export class ClientCredit{
  id : number;
	amount : number;
	date : Date ;
	client : ClientDTO;
  isPaid : boolean;
}

export class FournisseurCredit{
  id : number;
	amount : number;
	date : Date ;
	fournisseur : FournisseurDTO;
  isPaid : boolean;
}
