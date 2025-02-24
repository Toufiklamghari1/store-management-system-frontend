import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ActiveBannerNotificationService } from 'app/services/active-banner-notification.service';
import { TransactionService } from 'app/services/transaction-service';
import { ClientDTO, VentesDTO } from 'app/shared/stocker';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-ventes',
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.css']
})
export class VentesComponent implements OnInit {

  ventes = new Array<ClientDTO> ();
  ventesTable = new Array<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['reference', 'client', 'total', 'date', 'actions'];
  dataSource : MatTableDataSource<any>;



  constructor(private translate : TranslateService,
    private route : Router,
    private transactionService : TransactionService
    ) {
    translate.setDefaultLang('fr');
   }

  ngOnInit(): void {
    this.transactionService.getAllVentes().subscribe(clientList => {
      const clientObservables = clientList.map(a =>
        this.transactionService.getClientById(a.idClient)
      );

      forkJoin(clientObservables).subscribe(clients => {
        this.ventesTable = clientList.map((a, index) => ({
          reference: a.reference,
          client: clients[index].nom + ' ' + clients[index].prenom,
          total: a.total,
          date: a.venteDate
        }));

        this.dataSource = new MatTableDataSource(this.ventesTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  //------------ re-derict to Add New Achat Component ----------
  onAddNewAchat(){
    this.route.navigateByUrl('/add-vente')
  }

}
