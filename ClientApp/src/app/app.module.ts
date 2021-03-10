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
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { PropertyTableComponent } from './components/property-table/property-table.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { SuburbTableComponent } from './components/suburb-table/suburb-table.component';
import { SuburbFormComponent } from './components/suburb-form/suburb-form.component';
import { OwnerTableComponent } from './components/owner-table/owner-table.component';
import { OwnerFormComponent } from './components/owner-form/owner-form.component';

/* Services */
import { SuburbService } from './services/suburb.service';
import { OwnerService } from './services/owner.service';
import { PropertyService } from './services/property.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PropertyTableComponent,
    PropertyFormComponent,
    SuburbTableComponent,
    SuburbFormComponent,
    OwnerTableComponent,
    OwnerFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'counter', component: CounterComponent
      },
      {
        path: 'fetch-data', component: FetchDataComponent
      },
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
    SuburbService,
    PropertyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
