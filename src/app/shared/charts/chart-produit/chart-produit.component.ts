import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-produit',
  templateUrl: './chart-produit.component.html',
  styleUrls: ['./chart-produit.component.css']
})
export class ChartProduitComponent implements OnInit {

  @Input() data : ChartProduitComponent [];
  @Input() colorScheme : any;
  @Input() view: any[]

  ngOnInit(): void {

  }


  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FFC0CB', '#00FFFF']
  // };


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }




}



