/* Modules */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastyModule } from "ng2-toasty";
import { RoutingModule } from "./modules/routing.module";
import { CustomAuthModule } from "./modules/custom-auth.module";

/* Components */
import { AppComponent } from "./components/app.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { HomeComponent } from "./components/home/home.component";
import { PropertyTableComponent } from "./components/property-table/property-table.component";
import { PropertyFormComponent } from "./components/property-form/property-form.component";
import { SuburbTableComponent } from "./components/suburb-table/suburb-table.component";
import { SuburbFormComponent } from "./components/suburb-form/suburb-form.component";
import { OwnerTableComponent } from "./components/owner-table/owner-table.component";
import { OwnerFormComponent } from "./components/owner-form/owner-form.component";
import { TenantTableComponent } from "./components/tenant-table/tenant-table.component";
import { TenantFormComponent } from "./components/tenant-form/tenant-form.component";
import { RentalTableComponent } from "./components/rental-table/rental-table.component";
import { RentalFormComponent } from "./components/rental-form/rental-form.component";
import { PaginationComponent } from "./components/shared/pagination/pagination.component";

/* Services */
import { OwnerService } from "./services/owner.service";
import { TenantService } from "./services/tenant.service";
import { SuburbService } from "./services/suburb.service";
import { PropertyService } from "./services/property.service";
import { RentalService } from "./services/rental.service";
import { ToastService } from "./services/toast.service";

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
    TenantFormComponent,
    RentalTableComponent,
    RentalFormComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    ToastyModule.forRoot(),
    HttpClientModule,
    CustomAuthModule,
    FormsModule,
    FontAwesomeModule,
    RoutingModule,
  ],
  providers: [
    OwnerService,
    TenantService,
    SuburbService,
    PropertyService,
    RentalService,
    ToastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
