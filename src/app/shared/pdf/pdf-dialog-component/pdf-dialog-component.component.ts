import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-dialog-component',
  templateUrl: './pdf-dialog-component.component.html',
  styleUrls: ['./pdf-dialog-component.component.css']
})
export class PdfDialogComponentComponent implements OnInit {

  facture : string;
  constructor( public dialogRef: MatDialogRef<PdfDialogComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.facture = data.facture;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
