import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientDTO } from 'app/shared/stocker';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {

  @Output() clientSelected = new EventEmitter<ClientDTO>();
  @Output() newClientToSave = new EventEmitter<ClientDTO>();
  @Output() viewSelected = new EventEmitter<boolean>();
  @Input() clientItemSelected :ClientDTO;
  newClient = new ClientDTO();
  newClientView:boolean = false ;
  @Input() clients: ClientDTO[];

  //----------- new client variable ----------------
  clientNom: string= '';
  clientPrenom: string= '';
  clientAdress: string= '';
  clientTele: string= '';

  constructor() { }

  ngOnInit(): void {
  }


  //------------------------- New Client View activated ------------------------------------
  onNewClientViewActivated(event){
    this.initializeFormGroup();
    this.viewSelected.emit(this.newClientView);
  }

  onClientSelected(client){
    if(client){
      console.log('Client selected :', client);
      this.clientItemSelected=client
      this.clientSelected.emit(this.clientItemSelected);
    }else{
      this.clientItemSelected=null;
      this.clientSelected.emit(this.clientItemSelected);
    }
  }

  onSaveNewClient(){
    this.newClient.nom=this.clientNom;
    this.newClient.prenom=this.clientPrenom;
    this.newClient.adresse=this.clientAdress;
    this.newClient.numeroTele=this.clientTele;
    this.newClientToSave.emit(this.newClient);
    this.clientItemSelected=this.newClient;
    this.newClientView=!this.newClientView;
    this.viewSelected.emit(this.newClientView);
  }

  initializeFormGroup(){
    this.clientNom = '';
    this.clientPrenom= '';
    this.clientAdress= '';
    this.clientTele= '';
  }

  onCancel(){
    this.newClientView=!this.newClientView;
    this.viewSelected.emit(this.newClientView);
  }

}
