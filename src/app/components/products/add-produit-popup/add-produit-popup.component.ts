import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TransactionService } from 'app/services/transaction-service';
import { LoaderComponent } from 'app/shared/loader/loader.component';
import { LoaderService } from 'app/shared/loader/loader.service';
import { CategorieDTO, ProduitDTO } from 'app/shared/stocker';

@Component({
  selector: 'app-add-produit-popup',
  templateUrl: './add-produit-popup.component.html',
  styleUrls: ['./add-produit-popup.component.css']
})
export class AddProduitPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddProduitPopupComponent>,
    private transactionService : TransactionService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any[],produit : any }
    ) { }

  nouveauProduit : ProduitDTO = {libelle:'',categorie:null,prixUnitaire:0,nbrArticles:0};
  produitToModify : ProduitDTO;
  categories : CategorieDTO [];
  categorieSelacted: CategorieDTO = null;
  newCatgorieView: boolean = false;
  newCategorieName: string = '';


  formNewProduct:FormGroup = new FormGroup({
    libelle: new FormControl('',Validators.required),
    prixUnitaire: new FormControl('',Validators.required)
  });

  ngOnInit(){
    this.categories = this.data.categories;
    this.produitToModify = this.data.produit;
  }

  onAddItem = (desc : string) =>{
    let categorie = new CategorieDTO();
    categorie.description=desc;
    console.log('new label cat  >> ',categorie);
    this.transactionService.saveCategorie(categorie).subscribe((res)=>{
      console.log('saved >> cat >> ',res);
      this.categorieSelacted=res;
    });
    this.transactionService.getAllCategories().subscribe((categories)=>{
      this.categories=categories;
    })
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log(this.nouveauProduit);
    this.nouveauProduit.categorie=this.categorieSelacted;
    this.dialogRef.close(this.nouveauProduit);
  }

  onUpdateProduit(){
    console.log(this.produitToModify);
    this.dialogRef.close(this.produitToModify);
  }

  onCategorieSelected(element){
    console.log('cat >>> ',element);
    this.nouveauProduit.categorie=element;
  }

  //------------------------on New Catgorie View Activated -------------------------
  onNewCatgorieViewActivated(event){

  }


}
