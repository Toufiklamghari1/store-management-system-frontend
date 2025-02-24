import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { AchatsComponent } from './achats/achats.component';
import { VentesComponent } from './ventes/ventes.component';
import { CreditsComponent } from './credits/credits.component';
import { RetoursComponent } from './retours/retours.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAchatComponent } from './achats/add-achat/add-achat.component';
import { ConsultatAchatComponent } from './achats/consultat-achat/consultat-achat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddVenteComponent } from './ventes/add-vente/add-vente.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'app/Material.Module';
import { AddProduitPopupComponent } from './products/add-produit-popup/add-produit-popup.component';
import { DetailFournisseurComponent } from './achats/detail-fournisseur/detail-fournisseur.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DetailClientComponent } from './ventes/detail-client/detail-client.component';
import { ConsultatProduitPopupComponent } from './products/consultat-produit-popup/consultat-produit-popup.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartProduitComponent } from 'app/shared/charts/chart-produit/chart-produit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AddCreditComponent } from './credits/add-credit/add-credit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { OverlayModule } from '@angular/cdk/overlay';
import { ResponsiveCarouselComponent } from './dashboard/responsive-carousel/responsive-carousel/responsive-carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfDialogComponentComponent } from 'app/shared/pdf/pdf-dialog-component/pdf-dialog-component.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),
    NgxChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatBadgeModule,
    OverlayModule,
    NgbCarouselModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProductsComponent,
    AchatsComponent,
    VentesComponent,
    CreditsComponent,
    RetoursComponent,
    AddAchatComponent,
    ConsultatAchatComponent,
    AddVenteComponent,
    AddProduitPopupComponent,
    DetailFournisseurComponent,
    DetailClientComponent,
    ConsultatProduitPopupComponent,
    ChartProduitComponent,
    DashboardComponent,
    AddCreditComponent,
    ResponsiveCarouselComponent,
    PdfDialogComponentComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

  ]
})
export class ComponentsModule { }

