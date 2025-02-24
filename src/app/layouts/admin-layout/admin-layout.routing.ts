import { Routes } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';

import { AchatsComponent } from 'app/components/achats/achats.component';
import { VentesComponent } from 'app/components/ventes/ventes.component';
import { ProductsComponent } from 'app/components/products/products.component';
import { RetoursComponent } from 'app/components/retours/retours.component';
import { CreditsComponent } from 'app/components/credits/credits.component';
import { AddAchatComponent } from 'app/components/achats/add-achat/add-achat.component';
import { AddVenteComponent } from 'app/components/ventes/add-vente/add-vente.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'achats',     component: AchatsComponent },
    { path: 'ventes',     component: VentesComponent },
    { path: 'products',          component: ProductsComponent },
    { path: 'retour',           component: RetoursComponent },
    { path: 'credits',  component: CreditsComponent },
    { path: 'add-achat', component: AddAchatComponent },
    { path: 'add-vente', component: AddVenteComponent },
];
