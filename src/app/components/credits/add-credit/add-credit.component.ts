

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TransactionService } from 'app/services/transaction-service';
import { CategorieDTO, ClientDTO, Credit, FournisseurDTO, ProduitDTO } from 'app/shared/stocker';
import { Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.css']
})
export class AddCreditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCreditComponent>,
    private transactionService: TransactionService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { clients: any[], fournisseurs: any[], credit: any, isClient: boolean }
  ) {
    translate.setDefaultLang('fr');
  }

  newCredit: Credit = { id:0,amount: 0, date: new Date(), client: null, fournisseur: null, isPaid: false };

  creditToModify: Credit;
  clients: ClientDTO[];
  fournisseurs: FournisseurDTO[];
  isClient: boolean = true;
  clientSelected: ClientDTO;
  fournisseurSelected: FournisseurDTO;
  isCreditToModify: boolean = false;
  newFournisseurView: boolean = false;
  newClientView: boolean = false;
  dateInvalid: boolean = false;
  fournisseurForm: FormGroup;
  private mySub: Subscription;

  creditForm = new FormGroup({
    dateCredit: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),

  });




  ngOnInit() {
    this.isClient = this.data.isClient;
    if (this.isCreditToModify) {
      if (this.isClient) {
        this.clients = this.data.clients;
      } else {
        this.fournisseurs = this.data.fournisseurs;
      }
      this.creditToModify = this.data.credit;


    } else {
      if (this.isClient) {
        this.transactionService.getClients().subscribe((clients) => {
          this.clients = clients;
        })
      } else {
        this.transactionService.getFournisseur().subscribe((fournisseurs) => {
          this.fournisseurs = fournisseurs;
        })
      }
    }

  }

  onAddItem = (arg: any) => {
    if (this.isClient) {
      let client = new ClientDTO();
      this.transactionService.saveClient(client).subscribe((res) => {
        console.log('saved >> cat >> ', res);
        this.clientSelected = res;
      });
      this.transactionService.getClients().subscribe((clients) => {
        this.clients = clients;
      })
    } else {
      let fournisseur = new FournisseurDTO();
      this.transactionService.saveFournisseur(fournisseur).subscribe((res) => {
        console.log('saved >> cat >> ', res);
        this.fournisseurSelected = res;
      });
      this.transactionService.getFournisseur().subscribe((fournisseurs) => {
        this.fournisseurs = fournisseurs;
      })
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log(this.newCredit);
    if (this.isClient) {
      this.newCredit.client = this.clientSelected;

      this.dialogRef.close(this.newCredit);
    } else {
      this.newCredit.fournisseur = this.fournisseurSelected;

      this.dialogRef.close(this.newCredit);
    }

  }

  onUpdateProduit() {
    console.log(this.creditToModify);
    this.dialogRef.close(this.creditToModify);
  }

  onCustomerSelected(element) {
    console.log('cat >>> ', element);
    if (this.isClient) {
      this.newCredit.client = element;
    } else {
      this.newCredit.fournisseur = element;
    }

  }
  // --------------- New Fournisseur view selected
  onViewNewFournisseurSelected(event) {
    console.log('view', event);
    console.log('ffff', this.fournisseurSelected);
    this.newFournisseurView = event;

  }
  // --------------- New Client view selected
  onViewNewClientSelected(event) {
    console.log('view', event);
    console.log('ffff', this.clientSelected);
    this.newClientView = event;

  }

  onFournisseurSelected(fournisseur) {
    console.log('Fournisseur selected :', fournisseur);
    if (fournisseur) {
      this.fournisseurSelected = fournisseur;
      this.dateInvalid = false;
      this.newCredit.fournisseur = this.fournisseurSelected
    } else {
      this.fournisseurSelected = fournisseur;
      this.dateInvalid = true;
    }
  }

    //-----------------------After select client ----------------------------------------
    onClientSelected(client){
      if(client){
        this.clientSelected = client;
        this.dateInvalid=false;
        this.newCredit.client=client;
      }else{
        this.clientSelected = client;
        this.dateInvalid=true;
      }
    }
//------------ save New onSaveNewClient --------------------------------

onSaveNewClient(client){
  console.log('Client  >>> ',client);
  this.transactionService.saveClient(client).subscribe((res) =>{
      Swal.fire({
        title: 'Succès',
        text: 'Le client a été enregistré avec succès !',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
        }).then(() => {
            console.log('saved client : ',res);
            this.clientSelected=res;
            this.refreshListOfClients();
            });
      },
    (error)=>{
      console.log('impossible d\'enregistrer le client');
    }
  )
}


  //------------------------- delete ligne achats -------------------------------
  /*supprimerLigne(index: number): void {
    let ligne = index+1;
    let boo = confirm("la ligne "+  ligne+ " sera supprimer, vous voullez confirmer ?");
    if(boo){
      this.achatsTable.splice(index, 1);
  
    }
  
  }*/

  onSubmit(): void {
    if (this.creditForm.valid) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Voulez-vous enregistrer cet achat ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          this.newCredit.amount = this.creditForm.get("amount").value;
          this.newCredit.date = this.creditForm.get("dateCredit").value;
          this.newCredit.isPaid=false;
          if(this.isClient){
            this.newCredit.client =  this.clientSelected;
          }else{
            this.newCredit.fournisseur = this.fournisseurSelected;
          }
          console.log(this.newCredit)
          this.mySub = this.transactionService.saveCredit(this.newCredit).subscribe((res) => {
            Swal.fire({
              title: 'Succès',
              text: 'Le crédit a été enregistré avec succès !',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then(() => {
              this.data.credit = this.newCredit;
              this.data.isClient = this.isClient;
              this.dialogRef.close(this.data);

            });
          }

          );
        }
      });
    } else {
      console.log('  this.FFFFF >>>>>>', this.fournisseurForm.get('fournisseur'));
      this.creditForm.get('dateCredit');
      this.dateInvalid = true;
      this.fournisseurForm.get('fournisseur').markAllAsTouched();
      this.creditForm.markAllAsTouched;

    }
  }









  ngOnDestroy() {
    this.mySub.unsubscribe();
  }



  // ------------------- refresh list of client ---------------------------------------------

  refreshListOfClients() {
    this.transactionService.getClients().subscribe((res) => {
      this.clients = res;

    })
  }

  //------------ save New onSaveNewFournisseur --------------------------------

  onSaveNewFournisseur(fournisseur) {
    console.log('Fournisseur  >>> ', fournisseur);
    this.transactionService.saveFournisseur(fournisseur).subscribe((res) => {
      Swal.fire({
        title: 'Succès',
        text: 'Le fournisseur a été enregistré avec succès !',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        console.log('saved fournisseur : ', res);
        this.fournisseurSelected = res;
        this.refreshListOfFournisseurs();
      });
    },
      (error) => {
        console.log('impossible d\'enregistrer le fournisseur');
      }
    )
  }

  // ------------------- refresh list of Fournisseurs ---------------------------------------------

  refreshListOfFournisseurs() {
    this.transactionService.getFournisseur().subscribe((res) => {
      this.fournisseurs = res;
    })
  }

  //------------- Date Selected --------------------------------------------

  dateSelected(event) {
    if (this.creditForm.get('dateCredit').value) {
      this.dateInvalid = false;
    } else {
      this.dateInvalid = true;
    }
  }



}

