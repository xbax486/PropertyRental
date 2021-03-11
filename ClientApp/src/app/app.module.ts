import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/* Components */
import { AppComponent } from './components/app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { PropertyTableComponent } from './components/property-table/property-table.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { SuburbTableComponent } from './components/suburb-table/suburb-table.component';
import { SuburbFormComponent } from './components/suburb-form/suburb-form.component';
import { OwnerTableComponent } from './components/owner-table/owner-table.component';
import { OwnerFormComponent } from './components/owner-form/owner-form.component';
import { TenantTableComponent } from './components/tenant-table/tenant-table.component';
import { TenantFormComponent } from './components/tenant-form/tenant-form.component';

/* Services */
import { OwnerService } from './services/owner.service';
import { TenantService } from './services/tenant.service';
import { SuburbService } from './services/suburb.service';
import { PropertyService } from './services/property.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PropertyTableComponent,
    PropertyFormComponent,
    SuburbTableComponent,
    SuburbFormComponent,
    OwnerTableComponent,
    OwnerFormComponent,
    TenantTableComponent,
    TenantFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'owners', component: OwnerTableComponent
      },
      {
        path: 'owner/new', component: OwnerFormComponent
      },
      {
        path: 'owner/:id', component: OwnerFormComponent
      },
      {
        path: 'tenants', component: TenantTableComponent
      },
      {
        path: 'tenant/new', component: TenantFormComponent
      },
      {
        path: 'tenant/:id', component: TenantFormComponent
      },
      {
        path: 'properties', component: PropertyTableComponent
      },
      {
        path: 'property/new', component: PropertyFormComponent
      },
      {
        path: 'property/:id', component: PropertyFormComponent
      },
      {
        path: 'suburbs', component: SuburbTableComponent
      },
      {
        path: 'suburb/new', component: SuburbFormComponent
      },
      {
        path: 'suburb/:id', component: SuburbFormComponent
      },
      {
        path: '', component: HomeComponent, pathMatch: 'full'
      },
    ])
  ],
  providers: [
    OwnerService,
    TenantService,
    SuburbService,
    PropertyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
