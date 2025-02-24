import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TransactionService } from 'app/services/transaction-service';
import { AddCreditComponent } from './add-credit/add-credit.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ClientCredit, Credit, FournisseurCredit } from 'app/shared/stocker';
import { concat } from 'rxjs';


@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit , AfterViewInit{
  displayedColumns: string[] = ['id','Nom', 'Montant', 'Date', 'Statut','Actions'];
  dataSourceClient=new MatTableDataSource<ClientCredit>();
  dataSourceFournisseur=new MatTableDataSource<FournisseurCredit>();
  isClient:boolean = true;
  credits :Credit[]=[];
  fournisseurCredits : FournisseurCredit[] =[];
  clientCredits : ClientCredit[] =[];
  selectedIndex:number =0;
  length : number = 0;
  pageIndex : number = 0;
  pageSize : number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  constructor(private route: Router,public dialog: MatDialog, private translate: TranslateService,
    private transactionService: TransactionService) { 
     
        // Assign the data to the data source for the table to render
        translate.setDefaultLang('fr');
  }




  ngOnInit(): void {
    if(this.isClient){
      this.transactionService.getClientCredits().subscribe((credits) => {
        if(credits != null){
          this.clientCredits = credits;
          console.log("from nginit")
          console.log(this.credits)
          this.dataSourceClient = new MatTableDataSource(this.clientCredits);
          this.length = this.clientCredits.length;
          console.log("datasource")
          console.log(this.dataSourceClient.data)
  
        }
        else{
  
        }      
  
      })
    }else{
      this.transactionService.getFournisseurCredits().subscribe((credits) => {
        if(credits != null){
          this.dataSourceFournisseur = credits;
          console.log("from nginit")
          console.log(this.dataSourceFournisseur)
          this.dataSourceFournisseur = new MatTableDataSource(this.fournisseurCredits);
          console.log("datasource")
          console.log(this.dataSourceFournisseur.data)
  
        }
        else{
  
        }      
  
      })
    }

     
  }
  ngAfterViewInit() {
    this.dataSourceClient.paginator = this.paginator;
    this.dataSourceClient.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClient.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceClient.paginator) {
      this.dataSourceClient.paginator.firstPage();
    }
  }
   //----------- New product popup -------------------------
   openDialog(event) {
    const dialogRef = this.dialog.open(AddCreditComponent, {
      width: '500px',
      data: { isClient: this.isClient }, // Passer des données à la popup si nécessaire
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isClient = result.isClient;
        if(this.isClient){
          let creditClient = new ClientCredit();
          creditClient.amount = result.credit.amount;
          creditClient.client = result.credit.client;
          creditClient.date = result.credit.date;
          creditClient.amount = result.credit.amount;
          creditClient.id = result.credit.id;
          creditClient.id = result.credit.isPaid;
          this.clientCredits = this.clientCredits.concat([creditClient])
          this.dataSourceClient = new MatTableDataSource(this.clientCredits);
        }else{
          let creditFournisseur = new FournisseurCredit();
          creditFournisseur.amount = result.credit.amount;
          creditFournisseur.fournisseur = result.credit.fournisseur;
          creditFournisseur.date = result.credit.date;
          creditFournisseur.amount = result.credit.amount;
          creditFournisseur.id = result.credit.id;
          creditFournisseur.id = result.credit.isPaid;
          this.fournisseurCredits = this.fournisseurCredits.concat([creditFournisseur])
          this.dataSourceFournisseur = new MatTableDataSource(this.fournisseurCredits);
        }
      }
      console.log('result >>>', result);
    });
  }
  getCurrentTabIndex(event : MatTabChangeEvent) {
    let index = event.tab.textLabel;
    console.log("index")
    console.log(index)
    if(index === 'Clients'){
      this.isClient=true;
      this.transactionService.getClientCredits().subscribe((credits) => {
        if(credits != null){
          this.clientCredits = credits;
          console.log("from nginit")
          console.log(this.credits)
          this.dataSourceClient = new MatTableDataSource(this.clientCredits);
          console.log("datasource")
          console.log(this.dataSourceClient.data)
  
        }
        else{
  
        }      
  
      })
    }
    if(index === 'Fournisseur') {
      this.isClient = false
      this.transactionService.getFournisseurCredits().subscribe((credits) => {
        if(credits != null){
          this.fournisseurCredits = credits;
          console.log("from nginit")
          console.log(this.credits)
          this.dataSourceFournisseur = new MatTableDataSource(this.fournisseurCredits);
          console.log("datasource")
          console.log(this.dataSourceFournisseur.data)
  
        }
        else{
  
        }      
  
      })
      
    }
  }
  handlePageEvent(event : PageEvent){
    
  }

  
  
  
}

