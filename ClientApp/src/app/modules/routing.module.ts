/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Components */
import { HomeComponent } from '../components/home/home.component';
import { PropertyTableComponent } from '../components/property-table/property-table.component';
import { PropertyFormComponent } from '../components/property-form/property-form.component';
import { SuburbTableComponent } from '../components/suburb-table/suburb-table.component';
import { SuburbFormComponent } from '../components/suburb-form/suburb-form.component';
import { OwnerTableComponent } from '../components/owner-table/owner-table.component';
import { OwnerFormComponent } from '../components/owner-form/owner-form.component';
import { TenantTableComponent } from '../components/tenant-table/tenant-table.component';
import { TenantFormComponent } from '../components/tenant-form/tenant-form.component';
import { RentalTableComponent } from '../components/rental-table/rental-table.component';
import { RentalFormComponent } from '../components/rental-form/rental-form.component';

/* Guards */
import { AuthGuard } from '@auth0/auth0-angular';
import { CustomAuthGuard } from "../services/custom.auth-guard.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'owners', component: OwnerTableComponent,
        canActivate: [AuthGuard, CustomAuthGuard]
      },
      {
        path: 'owner',
        children: [
          {
            path: 'new', component: OwnerFormComponent
          },
          {
            path: ':id', component: OwnerFormComponent
          }
        ],
        canActivate: [AuthGuard, CustomAuthGuard]
      },
      {
        path: 'tenants', component: TenantTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tenant',
        children: [
          {
            path: 'new', component: TenantFormComponent
          },
          {
            path: ':id', component: TenantFormComponent
          }
        ],
        canActivate: [AuthGuard]
      },
      {
        path: 'properties', component: PropertyTableComponent,
        canActivate: [AuthGuard, CustomAuthGuard]
      },
      {
        path: 'property',
        children: [
          {
            path: 'new', component: PropertyFormComponent
          },
          {
            path: ':id', component: PropertyFormComponent
          }
        ],
        canActivate: [AuthGuard, CustomAuthGuard]
      },
      {
        path: 'suburbs', component: SuburbTableComponent,
        canActivate: [AuthGuard, CustomAuthGuard]
      },
      {
        path: 'suburb',
        children: [
          {
            path: 'new', component: SuburbFormComponent
          },
          {
            path: ':id', component: SuburbFormComponent
          }
        ],
        canActivate: [AuthGuard, CustomAuthGuard]
      },
      {
        path: 'rentals', component: RentalTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'rental',
        children: [
          {
            path: 'new', component: RentalFormComponent
          },
          {
            path: ':id', component: RentalFormComponent
          }
        ],
        canActivate: [AuthGuard]
      },
      {
        path: '', component: HomeComponent, pathMatch: 'full'
      },
      {
        path: '**', redirectTo: ''
      }
    ])
  ],
  providers: [],
  exports: [ RouterModule ]
})
export class RoutingModule { }
