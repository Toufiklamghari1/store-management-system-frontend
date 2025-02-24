import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FournisseurDTO } from 'app/shared/stocker';

@Component({
  selector: 'app-detail-fournisseur',
  templateUrl: './detail-fournisseur.component.html',
  styleUrls: ['./detail-fournisseur.component.css']
})
export class DetailFournisseurComponent implements OnInit {

  @Output() fournisseurSelected = new EventEmitter<FournisseurDTO>();
  @Output() newFournisseurToSave = new EventEmitter<FournisseurDTO>();
  @Output() viewSelected = new EventEmitter<boolean>();
  @Input() fournisseurItemSelected :FournisseurDTO;
  newFournisseur = new FournisseurDTO();
  newFournisseurView:boolean = false ;
  @Input() fournisseurs: FournisseurDTO[];

  //----------- new fournisseur variable ----------------
  fournisseurNom: string= '';
  fournisseurPrenom: string= '';
  fournisseurAdress: string= '';
  fournisseurTele: string= '';

  constructor() { }

  ngOnInit(): void {

  }


  //------------------------- New Fournisseur View activated ------------------------------------
  onNewFournisseurViewActivated(event){
    this.initializeFormGroup();
    this.viewSelected.emit(this.newFournisseurView);
  }

  onFournisseurSelected(fournisseur){
    if(fournisseur){
      console.log('Fournisseur selected :', fournisseur);
      this.fournisseurItemSelected=fournisseur
      this.fournisseurSelected.emit(this.fournisseurItemSelected);
    }else{
      this.fournisseurItemSelected=null;
      this.fournisseurSelected.emit(this.fournisseurItemSelected);
    }
  }

  onSaveNewFournisseur(){
    this.newFournisseur.nom=this.fournisseurNom;
    this.newFournisseur.prenom=this.fournisseurPrenom;
    this.newFournisseur.adresse=this.fournisseurAdress;
    this.newFournisseur.numeroTele=this.fournisseurTele;
    this.newFournisseurToSave.emit(this.newFournisseur);
    this.fournisseurItemSelected=this.newFournisseur;
    this.newFournisseurView=!this.newFournisseurView;
    this.viewSelected.emit(this.newFournisseurView);
  }

  initializeFormGroup(){
    this.fournisseurNom = '';
    this.fournisseurPrenom= '';
    this.fournisseurAdress= '';
    this.fournisseurTele= '';
  }

}
