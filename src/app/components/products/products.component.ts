import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CategorieService } from 'app/services/categorie.service';
import { ProduitService } from 'app/services/produit.service';
import { TransactionService } from 'app/services/transaction-service';
import { CategorieDTO, ChartProduitData, FournisseurDTO, ProduitDTO } from 'app/shared/stocker';
import Swal from 'sweetalert2';
import { AddProduitPopupComponent } from './add-produit-popup/add-produit-popup.component';
import { ConsultatProduitPopupComponent } from './consultat-produit-popup/consultat-produit-popup.component';
import * as chroma from 'chroma-js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  produits = new Array<ProduitDTO>();
  produitTable = new Array<any>();
  fournisseurs : FournisseurDTO [];
  categories : CategorieDTO [];
  data: ChartProduitData [] ;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSourceProduit =new MatTableDataSource<any>();

  displayedColumns: string[] = ['reference', 'libelle', 'nbrArticles', 'categorie', 'actions'];
  view: any[] = [500, 200];
  constructor(
    private translate: TranslateService,
    private route: Router,
    private transactionService: TransactionService,
    public dialog: MatDialog,
    private produitService : ProduitService,
    private categorieService : CategorieService

  ) {
    translate.setDefaultLang('fr');
  }

  //--------------- chart config -------------

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FFC0CB', '#00FFFF']
  };

  //----------------
  ngOnInit(): void {
     // Associez le sort et la pagination à votre MatTableDataSource
    this.transactionService.getAllProduits().subscribe((produits) => {
      console.log('produits >>>>', produits);
      this.produitTable = produits;
      this.dataSourceProduit =new MatTableDataSource(this.produitTable);

      console.log('dataSource',this.dataSourceProduit)
      this.dataSourceProduit.paginator = this.paginator;
      this.dataSourceProduit.sort = this.sort;
    });


    this.transactionService.getAllCategories().subscribe((categories)=>{
      this.categories=categories;
    });

    this.refreshChartData();


  }

  //------------ re-derict to Add New Achat Component ----------
  onAddNewAchat() {
    this.route.navigateByUrl('/add-achat');
  }

  //----------- New product popup -------------------------
  openDialog() {
    const dialogRef = this.dialog.open(AddProduitPopupComponent, {
      width: '500px',
      data: { categories: this.categories }, // Passer des données à la popup si nécessaire
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionService.saveProduct(result).subscribe(
          (res) => {
            this.refreshListOfProducts();
            this.refreshChartData();
          },
          (error) => {
            console.error(
              "Erreur lors de l'enregistrement du nouveau produit",
              error
            );
          }
        );
      }
      console.log('result >>>', result);
    });
  }

  refreshListOfProducts(){
    this.produitService.getProduits().subscribe((res)=>{
      this.produitTable=res;
      this.dataSourceProduit =new MatTableDataSource(this.produitTable);
    })
  }

  refreshChartData(){
    this.categorieService.getCountProduitByCategorie().subscribe((res)=>{
      this.data=res;
      const numColors = res.length;

      // Générer une palette de couleurs avec une luminosité fixe et une saturation variable
      const colorPalette = chroma.scale(['#fed800','#173eb4', '#f44336','#173eb4']).mode('lch').colors(numColors);

      // Créer le tableau de couleurs
      this.colorScheme = {
        domain: colorPalette
      };
    });

  }

  supprimerDonnee(){
    console.log('supprimer produit');
    Swal.fire({
      title: 'Confirmation',
      text: this.translate.instant('Messages.warning-delete-produit'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result)=>{
          console.log(' supprimer produit ');
    });

  }

  modifierDonnee(prod : ProduitDTO){
    console.log('modifer >>>>>>>> produit',prod)
    const dialogRef = this.dialog.open(AddProduitPopupComponent, {
      width: '500px',
      data: { categories: this.categories, produit : prod }, // Passer des données à la popup si nécessaire
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionService.saveProduct(result).subscribe(
          (res) => {
            console.log('product updated >> 2 ', res);
            this.refreshListOfProducts();
          },
          (error) => {
            console.error(
              "Erreur lors de l'enregistrement du nouveau produit",
              error
            );
          }
        );
      }
      this.refreshListOfProducts();
    });
  }

  afficherDonnee(prod){
    console.log('afficher produit',prod);
    const fournisseurObservable = this.transactionService.getFournisseurByProduitId(prod.idProduit);

    const dialogRef = this.dialog.open(ConsultatProduitPopupComponent, {
      width: '500px',
      data: { categories: this.categories, produit : prod }, // Passer des données à la popup si nécessaire
    });

    dialogRef.afterOpened().subscribe(() => {
      fournisseurObservable.subscribe((res) => {
        let fournisseurNames = new Array<any>();
        console.log('Fournisseurs ---- >>>>> ', res);
        res.forEach((f)=>{
          fournisseurNames.push(f.nom+' '+f.prenom);
        })
        dialogRef.componentInstance.fournisseurNames = fournisseurNames;
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionService.saveProduct(result).subscribe(
          (res) => {
            console.log('product updated >> 2 ', res);
            this.refreshListOfProducts();
          },
          (error) => {
            console.error(
              "Erreur lors de l'enregistrement du nouveau produit",
              error
            );
          }
        );
      }
      this.refreshListOfProducts();
    });
  }

  //----------------------

  openChart(){

  }
}
