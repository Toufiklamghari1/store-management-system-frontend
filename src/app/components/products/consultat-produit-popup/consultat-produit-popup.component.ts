import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TransactionService } from 'app/services/transaction-service';
import { CategorieDTO, FournisseurDTO, ProduitDTO } from 'app/shared/stocker';

@Component({
  selector: 'app-consultat-produit-popup',
  templateUrl: './consultat-produit-popup.component.html',
  styleUrls: ['./consultat-produit-popup.component.css']
})
export class ConsultatProduitPopupComponent implements OnInit {

  produitToShow : any;
  categorie : CategorieDTO;
  fournisseurNames : any ;
  listDisabled : boolean = true;
  selectedFournisseurs = new Array<any>();

  constructor(public dialogRef: MatDialogRef<ConsultatProduitPopupComponent>,
    private transactionService : TransactionService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { categorie: any,produit : any}) {

     }

    ngOnInit(){
      // this.data.fournisseurs.subscribe((res)=>{
      //   console.log('Res ###',res);
      //   res.forEach((f)=>{
      //     this.fournisseurNames=this.fournisseurNames+'-'+f.nom;
      // })
      // })
      this.categorie = this.data.categorie;
      this.produitToShow = this.data.produit;
      console.log('produitToShow  : ',this.produitToShow);
      this.selectedFournisseurs = this.fournisseurNames;
    }






    onClose(): void {
      console.log('close');
      this.dialogRef.close();
    }

}
