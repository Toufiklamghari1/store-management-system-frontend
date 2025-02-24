import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConsultatAchatComponent } from './application/achat/consultat-achat/consultat-achat.component';
import { AddVenteComponent } from './application/vente/add-vente/add-vente.component';
import { ConsultatVenteComponent } from './application/vente/consultat-vente/consultat-vente.component';
import { AddProduitComponent } from './application/produit/add-produit/add-produit.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import {  MaterialModule } from './Material.Module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoadingInterceptor } from './services/interceptors/loading.interceptor';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BannerComponent } from './shared/banner/banner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    ConsultatAchatComponent,
    AddVenteComponent,
    ConsultatVenteComponent,
    AddProduitComponent,
    AppComponent,
    AdminLayoutComponent,
    LoaderComponent,
    BannerComponent,


  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    MatDatepickerModule,
    MatInputModule,
    AdminLayoutModule,
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
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
