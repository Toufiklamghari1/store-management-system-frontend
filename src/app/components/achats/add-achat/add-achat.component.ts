import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AchatService } from 'app/services/achat-service';
import { ProduitService } from 'app/services/produit.service';
import { TransactionService } from 'app/services/transaction-service';
import {
  LigneAchatDTO,
  FournisseurDTO,
  ProduitDTO,
  AchatsDTO,
  CategorieDTO,
  AchatFactureRequest,
  Notification,
} from 'app/shared/stocker';
import { forkJoin, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddProduitPopupComponent } from 'app/components/products/add-produit-popup/add-produit-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { CreatePdfFactureService } from 'app/services/pdf-factures/create-pdf-facture.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActiveBannerNotificationService } from 'app/services/active-banner-notification.service';

@Component({
  selector: 'app-add-achat',
  templateUrl: './add-achat.component.html',
  styleUrls: ['./add-achat.component.css'],
})
export class AddAchatComponent implements OnInit {
  @Input() selectedAchatDate: Date;

  fournisseur: number[];
  fournisseurs: FournisseurDTO[];
  achatsTable: any[] = [
    { produit: null , quantitie: 0, prix: 0, idFournisseur: 0 },
  ];
  produits: ProduitDTO[];
  categories: CategorieDTO[];

  achatsToSave: AchatsDTO = {
    achatId: null,
    ligneAchats: [],
    idFournisseur: 0,
    total: 0,
    achatDate: null,
  };
  produitSelected: ProduitDTO;
  fournisseurSelected: FournisseurDTO;
  newFournisseurView: boolean = false;

  //newFournisseurView:false ;

  prixUnitaire: number;

  private mySub: Subscription;

  loaded: boolean = false;
  dateInvalid: boolean = false;
  fournisseurForm: FormGroup;
  achatFactureRequest : AchatFactureRequest={
    achatDate :null,
    fournisseurName:'',
    achatRef:'',
    ligneAchat:[],
    total:0
  } ;
  newFournisseur = new FournisseurDTO();
  achatsDataSet: MatTableDataSource<any>;

  constructor(
    private formBuilder: FormBuilder,
    private achatService: AchatService,
    private produitService: ProduitService,
    private transactionService: TransactionService,
    private route: Router,
    public dialog: MatDialog,
    private translate: TranslateService,
    private createPdfFacture: CreatePdfFactureService,
    private activeBannerNotificationService :ActiveBannerNotificationService
  ) {
    translate.setDefaultLang('fr');
    this.achatsDataSet = new MatTableDataSource(this.achatsTable);
  }

  factureForm = new FormGroup({
    dateAchat: new FormControl('', Validators.required),
  });

  ngOnInit() {

    const notification: Notification = {
      message: 'Merci de selectionner un fournisseur !',
      type: 'info'
    };

    this.activeBannerNotificationService.showNotification(notification);
    this.mySub = forkJoin(
      this.produitService.getProduits(),
      this.transactionService.getFournisseur(),
      this.transactionService.getAllCategories()
    ).subscribe(
      ([produits, fournisseurs, categories]) => {
        // Traiter les résultats ici
        console.log(fournisseurs.length);
        if (fournisseurs.length !== 0) {
          this.produits = produits;
          this.fournisseurs = fournisseurs;
          this.categories = categories;
          this.loaded = true;
          this.fournisseur = [this.fournisseurs[0].idFournisseur];
          this.selectAllForDropdownItems(this.fournisseurs);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.fournisseurForm = this.formBuilder.group({
      fournisseur: ['', Validators.required],
    });
  }
  //------------------------- add ligne achats -------------------------------
  ajouterLigne(): void {
    this.achatsTable.push({ produit: null, categorie: null, nombre: null, prix: null });
    this.achatsDataSet = new MatTableDataSource(this.achatsTable);
  }
  //------------------------- delete ligne achats -------------------------------
  supprimerLigne(index: number): void {
    console.log('data >>>',this.achatsDataSet.data[index]);
    if(index!==0){
      let ligne = index + 1;
      Swal.fire({
        title: 'Confirmation',
        text: 'la ligne ' + ligne + ' sera supprimer, vous voullez confirmer ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
      }).then((result) => {
        if (result.isConfirmed) {
          this.achatsTable.splice(index, 1);
          this.achatsDataSet = new MatTableDataSource(this.achatsTable);
        }
      });
    }else{
      console.log('ligne vide ! ');
    }
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      if (this.verifyProduitList() !== 0) {
        Swal.fire({
          title: 'Attention',
          text: 'Merci de verifier la liste des produits ',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      } else {
        this.beforSubmit();
        Swal.fire({
          title: 'Confirmation',
          text: 'Voulez-vous enregistrer cet achat ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non',
        }).then((result) => {
          if (result.isConfirmed) {
            this.mySub = this.transactionService
              .saveAchats(this.achatsToSave)
              .subscribe(
                (res) => {
                  Swal.fire({
                    title: 'Succès',
                    text: "L'achat a été enregistré avec succès !",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  }).then(() => {
                    console.log('Achat saved >>', res);
                    this.route
                      .navigateByUrl('/dashboard', { skipLocationChange: true })
                      .then(() => {
                        this.route.navigate(['/achats']);
                      });
                  });
                },
                (error) => {
                  Swal.fire({
                    title: 'Attention',
                    text: "Erreur svp contacter l'Admin ",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  }).then(() => {
                    this.route
                      .navigateByUrl('/dashboard', { skipLocationChange: true })
                      .then(() => {
                        this.route.navigate(['/add-achat']);
                      });
                  });
                }
              );
          }
        });
      }
    } else {

      this.factureForm.get('dateAchat');
      this.dateInvalid = true;
      this.fournisseurForm.get('fournisseur').markAllAsTouched();
      this.factureForm.markAllAsTouched;
    }
  }
  //------------------------- befor doing submit of achats ----------------------------
  beforSubmit() {
    this.achatsTable.forEach((item) => {
      let product = item.produit;
      let ligne = new LigneAchatDTO(product, item.nombre);
      this.achatsToSave.ligneAchats.push(ligne);
    });
    this.achatsToSave.total = this.getTotal();
    this.achatsToSave.idFournisseur = this.fournisseurSelected.idFournisseur;
    this.achatsToSave.achatDate = this.factureForm.get('dateAchat').value;
  }

  //------------------ selected fournisseur from list -----------------------------
  selectAllForDropdownItems(items: any[]) {
    let allSelect = (items) => {
      items.forEach((element) => {
        element['selectedAllGroup'] = 'selectedAllGroup';
      });
    };

    allSelect(items);
  }

  //--------------------- select product -----------------------------------------
  onProduitSelected(element, i) {
    console.log('Produit selected :', element);
    let achatElement = {
      produit: element,
      nombre: 1,
      prix: 0,
      idFournisseur: this.fournisseurSelected.idFournisseur,
    };
    if (element) {
      this.achatsTable[i] = achatElement;
      this.prixUnitaire = element.prixUnitaire;
    }
  }

  //-----------------------After select fournisseur ----------------------------------------
  onFournisseurSelected(fournisseur) {
    console.log('Fournisseur selected :', fournisseur);
    if (fournisseur) {
      this.fournisseurSelected = fournisseur;
      this.dateInvalid = false;
      this.achatsToSave.idFournisseur = fournisseur.id;
    } else {
      this.fournisseurSelected = fournisseur;
      this.dateInvalid = true;
    }
  }
  //------------------------------recuperte number of articles ---------------------------
  onChangeNumerArticle(event, i) {
    console.log('i :', this.achatsTable[i]?.nombre);
  }

  //-------------------- Calculate total for facture ------------------------------
  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.achatsTable.length; i++) {
      if (this.achatsTable[i].produit) {
        total +=
          this.achatsTable[i].produit.prixUnitaire * this.achatsTable[i].nombre;
      }
    }
    return total;
  }

  ngOnDestroy() {
    this.mySub.unsubscribe();
  }

  //---------------------- Recuperate result form popup of new product ------------------------
  openDialog() {
    const dialogRef = this.dialog.open(AddProduitPopupComponent, {
      width: '500px',
      data: { categories: this.categories }, // Passer des données à la popup si nécessaire
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('product seved >> 1 ', result);
        this.transactionService.saveProduct(result).subscribe(
          (res) => {
            console.log('product seved >> 2 ', res);
            this.achatsTable[this.achatsTable.length - 1].produit = res;
            this.achatsTable[this.achatsTable.length - 1].nombre = 0;
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
      console.log('result >>>', result);
    });
  }

  // ------------------- refresh list of product ---------------------------------------------

  refreshListOfProducts() {
    console.log('achat ligne size >>', this.achatsTable.length);
    this.produitService.getProduits().subscribe((res) => {
      this.produits = res;
    });
  }

  //------------ save New onSaveNewFournisseur --------------------------------

  onSaveNewFournisseur(fournisseur) {
    console.log('Fournisseur  >>> ', fournisseur);
    this.transactionService.saveFournisseur(fournisseur).subscribe(
      (res) => {
        Swal.fire({
          title: 'Succès',
          text: 'Le fournisseur a été enregistré avec succès !',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          console.log('saved fournisseur : ', res);
          this.fournisseurSelected = res;
          this.refreshListOfFournisseurs();
        });
      },
      (error) => {
        console.log("impossible d'enregistrer le fournisseur");
      }
    );
  }

  // ------------------- refresh list of Fournisseurs ---------------------------------------------

  refreshListOfFournisseurs() {
    console.log('achat ligne size >>', this.achatsTable.length);
    this.transactionService.getFournisseur().subscribe((res) => {
      this.fournisseurs = res;
    });
  }

  //------------- Date Selected --------------------------------------------

  dateSelected(event) {
    if (this.factureForm.get('dateAchat').value) {
      this.dateInvalid = false;
    } else {
      this.dateInvalid = true;
    }
  }

  // --------------- New Fournisseur view selected
  onViewNewFournisseurSelected(event) {
    console.log('view', event);
    console.log('ffff', this.fournisseurSelected);
    this.newFournisseurView = event;
  }

  //-------------------------
  onGoToAchats() {
    console.log('go to ');
  }

  //------ verify product list
  verifyProduitList(): any {
    let result = 0;
    this.achatsTable.forEach((ligne) => {
      if (ligne.produit === '') {
        result++;
      }
    });
    return result;
  }

  //------------ Imprmimer Facture -------------

  onPrint() {
    /***  TO-DO : add controller of virtual facture and real one ************/
    console.log('go to print -->');
    if (!this.factureForm.valid) {
      this.factureForm.get('dateAchat');
      this.dateInvalid = true;
      this.fournisseurForm.get('fournisseur').markAllAsTouched();
      this.factureForm.markAllAsTouched;
    } else {
      if (this.verifyProduitList() !== 0) {
        Swal.fire({
          title: 'Attention',
          text: 'Merci de verifier la liste des produits ',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Confirmation',
          text: 'Voulez-vous enregistrer cet achat ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non',
        }).then((result) => {
          if (result.isConfirmed) {

            this.beforPrint();
            this.mySub = this.createPdfFacture
              .createFactureAchat(this.achatFactureRequest)
              .subscribe(
                (res) => {
                  Swal.fire({
                    title: 'Succès',
                    text: 'Facture creer avec succès !',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  }).then(() => {
                    console.log('Response of PDF service : ', res);
                    this.route
                      .navigateByUrl('/dashboard', { skipLocationChange: true })
                      .then(() => {
                        this.route.navigate(['/achats']);
                      });
                  });
                },
                (error) => {
                  Swal.fire({
                    title: 'Succès',
                    text: "Erreur svp contacter l'Admin ",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: this.translate.instant('Button.close'),
                  }).then(() => {
                    this.route
                      .navigateByUrl('/dashboard', { skipLocationChange: true })
                      .then(() => {
                        this.route.navigate(['/add-achat']);
                      });
                  });
                }
              );
          }
        });
      }
    }
  }

  beforPrint(){
    //this.beforSubmit();
    this.achatsTable.forEach((item) => {
      let product = item.produit;
      let ligne = new LigneAchatDTO(product, item.nombre);
      this.achatFactureRequest.ligneAchat.push(ligne);
    });

    this.achatFactureRequest.achatRef = 'virtual';
    this.achatFactureRequest.fournisseurName =
      this.fournisseurSelected.nom +
      ' ' +
      this.fournisseurSelected.prenom;

    this.achatFactureRequest.achatDate = this.factureForm.get('dateAchat').value;;
    this.achatFactureRequest.total =this.getTotal();

    console.log('achatFactureRequest >>>', this.achatFactureRequest);
  }




}
