import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'app/services/categorie.service';
import { ChartProduitData } from 'app/shared/stocker';
import * as chroma from 'chroma-js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: ChartProduitData [] ;
  view: any[] = [600, 200];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FFC0CB', '#00FFFF']
  };


  constructor(private categorieService : CategorieService) { }

  ngOnInit() {

    this.categorieService.getCountProduitByCategorie().subscribe((res)=>{
      this.data=res;
      const numColors = res.length;

      // Générer une palette de couleurs avec une luminosité fixe et une saturation variable
      const colorPalette = chroma.scale(['#1786b4','#346baa','#f44336','#318f70']).mode('lch').colors(numColors);

      // Créer le tableau de couleurs
      this.colorScheme = {
        domain: colorPalette
      };
    });
  }

}
