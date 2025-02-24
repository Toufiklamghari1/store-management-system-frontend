import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AddProduitPopupComponent } from 'app/components/products/add-produit-popup/add-produit-popup.component';
import { ActiveBannerNotificationService } from 'app/services/active-banner-notification.service';
import { CreatePdfFactureService } from 'app/services/pdf-factures/create-pdf-facture.service';
import { ProduitService } from 'app/services/produit.service';
import { TransactionService } from 'app/services/transaction-service';
import {
  VentesDTO,
  ClientDTO,
  LigneVenteDTO,
  ProduitDTO,
  CategorieDTO,
  AchatFactureRequest,
  Notification,
} from 'app/shared/stocker';
import { forkJoin, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vente',
  templateUrl: './add-vente.component.html',
  styleUrls: ['./add-vente.component.css'],
})
export class AddVenteComponent implements OnInit {
  @Input() selectedVenteDate: Date;

  client: number[];
  clients: ClientDTO[];
  ventesTable: any[] = [{ produit: null, quantitie: 0, prix: 0, idClient: 0 }];
  produits: ProduitDTO[];
  categories: CategorieDTO[];

  ventesToSave: VentesDTO = {
    venteId: null,
    ligneVentes: [],
    idClient: 0,
    total: 0,
    venteDate: null,
  };
  produitSelected: ProduitDTO;
  clientSelected: ClientDTO;
  newClientView: boolean = false;

  venteFactureRequest: AchatFactureRequest = {
    achatDate: null,
    fournisseurName: '',
    achatRef: '',
    ligneAchat: [],
    total: 0,
  };

  //newClientView:false ;

  prixUnitaire: number;

  private mySub: Subscription;

  loaded: boolean = false;
  dateInvalid: boolean = false;
  clientForm: FormGroup;

  newClient = new ClientDTO();

  ventesDataSet: MatTableDataSource<any>;



  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private transactionService: TransactionService,
    private route: Router,
    public dialog: MatDialog,
    private translate: TranslateService,
    private createPdfFacture: CreatePdfFactureService,
    private activeBannerNotificationService :ActiveBannerNotificationService
  ) {
    translate.setDefaultLang('fr');
    this.ventesDataSet = new MatTableDataSource(this.ventesTable);

  }

  factureForm = new FormGroup({
    dateVente: new FormControl('', Validators.required),
  });

  ngOnInit() {
    const notification: Notification = {
      message: 'Merci de selectionner un client !',
      type: 'info'
    };

    this.activeBannerNotificationService.showNotification(notification);
    this.mySub = forkJoin(
      this.produitService.getProduits(),
      this.transactionService.getClients(),
      this.transactionService.getAllCategories()
    ).subscribe(
      ([produits, clients, categories]) => {
        // Traiter les résultats ici
        console.log(clients.length);
        if (clients.length !== 0) {
          this.produits = produits;
          this.clients = clients;
          this.categories = categories;
          this.loaded = true;
          this.client = [this.clients[0].clientId];
          this.selectAllForDropdownItems(this.clients);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.clientForm = this.formBuilder.group({
      client: ['', Validators.required],
    });
  }
  //------------------------- add ligne ventes -------------------------------
  ajouterLigne(): void {
    this.ventesTable.push({ produit: null, categorie: null, nombre: null, prix: null });
    this.ventesDataSet = new MatTableDataSource(this.ventesTable);
  }
  //------------------------- delete ligne ventes -------------------------------
  supprimerLigne(index: number): void {
    console.log('data >>>',this.ventesDataSet.data[index]);
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
          this.ventesTable.splice(index, 1);
          this.ventesDataSet = new MatTableDataSource(this.ventesTable);
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
              .saveVentes(this.ventesToSave)
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
                    console.log('Vente saved >>', res);
                    this.route
                      .navigateByUrl('/dashboard', { skipLocationChange: true })
                      .then(() => {
                        this.route.navigate(['/ventes']);
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
                        this.route.navigate(['/add-vente']);
                      });
                  });
                }
              );
          }
        });
      }
    } else {
      console.log('  this.FFFFF >>>>>>', this.clientForm.get('client'));
      //this.factureForm.reset();
      this.factureForm.get('dateVente');
      this.dateInvalid = true;
      this.clientForm.get('client').markAllAsTouched();
      this.factureForm.markAllAsTouched;
    }
  }
  //------------------------- befor doing submit of ventes ----------------------------
  beforSubmit() {
    this.ventesTable.forEach((item) => {
      let product = item.produit;
      let ligne = new LigneVenteDTO(product, item.nombre);
      this.ventesToSave.ligneVentes.push(ligne);
    });
    this.ventesToSave.total = this.getTotal();
    console.log('this.clientSelected >>>>>>', this.clientSelected);
    this.ventesToSave.idClient = this.clientSelected.clientId;
    this.ventesToSave.venteDate = this.factureForm.get('dateVente').value;
    console.log('client >>', this.clientSelected);
    console.log('achat to save >>', this.ventesToSave);
    console.log('date achat >>', this.ventesToSave.venteDate);
  }

  //------------------ selected client from list -----------------------------
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
      idClient: this.clientSelected.clientId,
    };
    if (element) {
      this.ventesTable[i] = achatElement;
      this.prixUnitaire = element.prixUnitaire;
    }
  }

  //-----------------------After select client ----------------------------------------
  onClientSelected(client) {
    console.log('Client selected :', client);
    if (client) {
      this.clientSelected = client;
      this.dateInvalid = false;
      this.ventesToSave.idClient = client.id;
    } else {
      this.clientSelected = client;
      this.dateInvalid = true;
    }
  }
  //------------------------------recuperte number of articles ---------------------------
  onChangeNumerArticle(event, i) {
    console.log('i :', this.ventesTable[i]?.nombre);
  }

  //-------------------- Calculate total for facture ------------------------------
  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.ventesTable.length; i++) {
      if (this.ventesTable[i].produit) {
        total +=
          this.ventesTable[i].produit.prixUnitaire * this.ventesTable[i].nombre;
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
            this.ventesTable[this.ventesTable.length - 1].produit = res;
            this.ventesTable[this.ventesTable.length - 1].nombre = 0;
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
    console.log('achat ligne size >>', this.ventesTable.length);
    this.produitService.getProduits().subscribe((res) => {
      this.produits = res;
    });
  }

  //------------ save New onSaveNewClient --------------------------------

  onSaveNewClient(client) {
    console.log('Client  >>> ', client);
    this.transactionService.saveClient(client).subscribe(
      (res) => {
        Swal.fire({
          title: 'Succès',
          text: 'Le client a été enregistré avec succès !',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          console.log('saved client : ', res);
          this.clientSelected = res;
          this.refreshListOfClients();
        });
      },
      (error) => {
        console.log("impossible d'enregistrer le client");
      }
    );
  }

  // ------------------- refresh list of Clients ---------------------------------------------

  refreshListOfClients() {
    console.log('achat ligne size >>', this.ventesTable.length);
    this.transactionService.getClients().subscribe((res) => {
      this.clients = res;
    });
  }

  //------------- Date Selected --------------------------------------------

  dateSelected(event) {
    if (this.factureForm.get('dateVente').value) {
      this.dateInvalid = false;
    } else {
      this.dateInvalid = true;
    }
  }

  // --------------- New Client view selected
  onViewNewClientSelected(event) {
    console.log('view', event);
    console.log('ffff', this.clientSelected);
    this.newClientView = event;
  }

  //-------------------------
  onGoToVentes() {
    console.log('go to ');
  }

  onPrint() {
    /***  TO-DO : add controller of virtual facture and real one ************/
    console.log('go to print -->');
    if (!this.factureForm.valid) {
      this.factureForm.get('dateAchat');
      this.dateInvalid = true;
      this.clientForm.get('client').markAllAsTouched();
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
              .createFactureVente(this.venteFactureRequest)
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
                        this.route.navigate(['/ventes']);
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
                        this.route.navigate(['/add-vent']);
                      });
                  });
                }
              );
          }
        });
      }
    }
  }

  verifyProduitList(): any {
    let result = 0;
    this.ventesTable.forEach((ligne) => {
      if (ligne.produit === '') {
        result++;
      }
    });
    return result;
  }

  beforPrint() {
    //this.beforSubmit();
    this.ventesTable.forEach((item) => {
      let product = item.produit;
      let ligne = new LigneVenteDTO(product, item.nombre);
      this.venteFactureRequest.ligneAchat.push(ligne);
    });

    this.venteFactureRequest.achatRef = 'virtual';
    this.venteFactureRequest.fournisseurName =
      this.clientSelected.nom + ' ' + this.clientSelected.prenom;

    this.venteFactureRequest.achatDate =
      this.factureForm.get('dateVente').value;
    this.venteFactureRequest.total = this.getTotal();

    console.log('venteFactureRequest >>>', this.venteFactureRequest);
  }
}
