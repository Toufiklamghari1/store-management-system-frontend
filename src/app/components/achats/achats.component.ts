import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TransactionService } from 'app/services/transaction-service';
import { PdfDialogComponentComponent } from 'app/shared/pdf/pdf-dialog-component/pdf-dialog-component.component';
import { FournisseurDTO } from 'app/shared/stocker';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-achats',
  templateUrl: './achats.component.html',
  styleUrls: ['./achats.component.css'],
})
export class AchatsComponent implements OnInit {
  achats = new Array<FournisseurDTO>();
  achatsTable = new Array<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'reference',
    'fournisseur',
    'total',
    'date',
    'actions',
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private translate: TranslateService,
    private route: Router,
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    this.transactionService.getAllAchats().subscribe((achatsList) => {
      console.log('List des Achats', achatsList);
      achatsList.forEach((a) => {
        this.transactionService
          .getFournisseurById(a.idFournisseur)
          .subscribe((fournisseur) => {
            console.log('fournisseur >>>>', fournisseur);
            this.achatsTable.push({
              reference: a.reference,
              fournisseur: fournisseur.nom + ' ' + fournisseur.prenom,
              total: a.total,
              date: a.achatDate,
            });
          });
      });
    });

    this.transactionService.getAllAchats().subscribe((achatsList) => {
      const fournisseurObservables = achatsList.map((a) =>
        this.transactionService.getClientById(a.idFournisseur)
      );

      forkJoin(fournisseurObservables).subscribe((fournisseurs) => {
        this.achatsTable = achatsList.map((a, index) => ({
          reference: a.reference,
          fournisseur:
            fournisseurs[index].nom + ' ' + fournisseurs[index].prenom,
          total: a.total,
          date: a.achatDate,
        }));

        this.dataSource = new MatTableDataSource(this.achatsTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });

    // this.transactionService.getFournisseurById(a.idFournisseur).subscribe((fournisseur)=>{
    //   console.log('fournisseur >>>>',fournisseur);
    // })

    //this.achatsTable.push({fournisseur: '', quantitie : 0, total: 0, date : ''})
  }

  //------------ re-derict to Add New Achat Component ----------
  onAddNewAchat() {
    this.route.navigateByUrl('/add-achat');
  }

  //-------------- print pdf --------------
  print(item: number) {
    let achatRef = this.achatsTable[0];
    console.log('achatRef >>>>', achatRef.reference);
    const dialogRef = this.dialog.open(PdfDialogComponentComponent, {
      width: '800px',
      height: '679px',
      data: {
        pdfUrl: 'assets/pdf/doc.pdf',
        facture: "Facture de l'achat : " + achatRef.reference,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result >>>', result);
    });
  }
}
