import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AddAchatComponent } from './components/achats/add-achat/add-achat.component';
import { AddProduitComponent } from './application/produit/add-produit/add-produit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,
    // children : [
    //   //redirect
    //   {
    //     path : '',
    //     redirectTo:'/login',
    //     pathMatch:'full'
    //   },
    //   {
    //     path:'dashboard',
    //     // loadChildren : ()=>
    //     // import('./dashboard/dashboard.module').then((m)=>m.DashboardModule),
    //   }
    // ]
},
{ path: 'dashboard', component: AdminLayoutComponent,
children: [{
  path: '',
  loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
}], canActivate: [AuthGuard]  },
{ path: 'add-achat', component: AddAchatComponent, canActivate: [AuthGuard] },

{ path: 'produit', component: AddProduitComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
