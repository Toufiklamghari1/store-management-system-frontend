import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-responsive-carousel',
  templateUrl: './responsive-carousel.component.html',
  styleUrls: ['./responsive-carousel.component.css']
})
export class ResponsiveCarouselComponent {

  images = [1,2,3,4].map((n) => `/assets/img/${n}.jpg`);

  constructor(private translate : TranslateService) {
    translate.setDefaultLang('fr');
  }


}
