import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from 'app/services/categorie.service';
import { ProduitService } from 'app/services/produit.service';




@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  produitForm: FormGroup;
  categories: any[];

  constructor(private router : Router,private formBuilder: FormBuilder, private produitService: ProduitService, private categorieService: CategorieService) { }

  ngOnInit() {
    this.produitForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      prixUnitaire: ['', Validators.required],
      categorie: ['', Validators.required]
    });

    this.categorieService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    const produit = {
      libelle: this.produitForm.value.libelle,
      prixUnitaire: this.produitForm.value.prixUnitaire,
      categorie: this.produitForm.value.categorie
    };

    // this.produitService.addProduit(produit).subscribe(
    //   () => {
    //     console.log('Produit ajouté avec succès !');
    //     this.router.navigate(['/produits']);
    //   },
    //   (error) => {
    //     console.log('Erreur lors de l\'ajout du produit : ', error);
    //   }
    // );
  }

}
