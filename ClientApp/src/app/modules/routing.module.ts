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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'owners', component: OwnerTableComponent
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
        ]
      },
      {
        path: 'tenants', component: TenantTableComponent
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
        ]
      },
      {
        path: 'properties', component: PropertyTableComponent
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
        ]
      },
      {
        path: 'suburbs', component: SuburbTableComponent
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
        ]
      },
      {
        path: 'rentals', component: RentalTableComponent
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
        ]
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
