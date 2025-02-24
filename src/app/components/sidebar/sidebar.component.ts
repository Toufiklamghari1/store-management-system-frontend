import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { animateMenuItem, animateText } from './animation';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[];
    isExpanded?: boolean;
    isActive?:boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', isActive :true },
    { path: '/achats', title: 'Achats',  icon:'content_paste', class: '',children: [
      {
        path: 'add-achat',
        title: 'Ajouter un achat',
        icon: 'content_paste',
        class: '',
        isActive :false
      }
    ]
  ,isExpanded : false,
  isActive :false
},
    { path: '/ventes', title: 'Ventes',  icon:'store', class: '',isActive :false },
    { path: '/products', title: 'Produits',  icon:'bubble_chart', class: '',isActive :false },
    { path: '/retour', title: 'Retour',  icon:'undo', class: '',isActive :false },
    { path: '/credits', title: 'Credits',  icon:'credit_score', class: '',isActive :false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [animateText,animateMenuItem]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  linkText: boolean = false;

  showMenu_Self : boolean = false;

  arrow : string = 'arrow_drop_down';

  public showSubMenu: boolean = false;

  isSidebarOpen: boolean = false;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  toggled : boolean = false;

  public toggleSubMenu(menuItem) {

      // set isActive property of clicked menuItem to true
  menuItem.isActive = !menuItem.isActive;

  console.log('menuItem.isActive >>>>',menuItem.isActive)

  // set isActive property of all other menuItems to false
  this.menuItems.forEach(item => {
    if (item !== menuItem) {
      item.isActive = false;
      item.isExpanded = false;
    }
  });

    if (menuItem.children) {
      this.showMenu_Self= ! this.showMenu_Self;
      menuItem.isExpanded = !menuItem.isExpanded;
    }
  }

  showSelfService(): void {
    this.showMenu_Self = !this.showMenu_Self;
    //this.showMenu_MHC = false;
  }

}
