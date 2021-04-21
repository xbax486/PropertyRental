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

/* Others */
import { AuthGuard } from '@auth0/auth0-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'owners', component: OwnerTableComponent,
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
      },
      {
        path: 'suburbs', component: SuburbTableComponent,
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
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
