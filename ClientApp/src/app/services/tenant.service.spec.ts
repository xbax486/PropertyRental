import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TenantService } from "./tenant.service";
import { QueryResult } from "../models/query/queryResult";
import { Tenant } from "../models/tenant";

fdescribe("TenantService", () => {
  let tenantService: TenantService,
    httpTestingController: HttpTestingController,
    query = {};
  const tenantEndpoint = "/api/tenants";

  const queryResult: QueryResult<Tenant> = {
    totalItems: 3,
    items: [
      {
        name: "Tenant1",
        email: "tenant1@example.com",
        mobile: "0412345678",
        id: 1,
      },
      {
        name: "Tenant2",
        email: "tenant2@example.com",
        mobile: "0412345679",
        id: 2,
      },
      {
        name: "Tenant3",
        email: "tenant3@example.com",
        mobile: "0412345670",
        id: 3,
      },
    ],
  };

  const passedTenant: Tenant = {
    name: "Tenant4",
    email: "tenant4@example.com",
    mobile: "0412345674",
    id: 4,
  };

  const returnedTenant: Tenant = {
    name: "Tenant4",
    email: "tenant4@example.com",
    mobile: "0412345674",
    id: 4,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TenantService],
    });
    tenantService = TestBed.inject(TenantService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(tenantService).toBeTruthy();
  });

  it("should return a query result with all tenants", () => {
    tenantService
      .getTenants(query)
      .subscribe((queryResult: QueryResult<Tenant>) => {
        expect(queryResult).toBeTruthy();
        expect(queryResult.totalItems).toBeGreaterThan(0);
      });
    const req = httpTestingController.expectOne(tenantEndpoint);
    expect(req.request.method).toBe("GET");
    req.flush({ ...queryResult });
  });

  it("should return the new tenant if tenant creation succeeds", () => {
    tenantService.createTenant(passedTenant).subscribe((response) => {
      expect(response.name).toEqual(passedTenant.name);
      expect(response.email).toEqual(passedTenant.email);
      expect(response.mobile).toEqual(passedTenant.mobile);
    });
    const req = httpTestingController.expectOne(tenantEndpoint);
    expect(req.request.method).toBe("POST");
    req.flush(returnedTenant);
  });

  it("should return the updated tenant if tenant update succeeds", () => {
    tenantService.updateTenant(passedTenant).subscribe((response) => {
      expect(response.name).toEqual(passedTenant.name);
      expect(response.email).toEqual(passedTenant.email);
      expect(response.mobile).toEqual(passedTenant.mobile);
      expect(response.id).toEqual(passedTenant.id);
    });
    const req = httpTestingController.expectOne(
      tenantEndpoint + "/" + passedTenant.id
    );
    expect(req.request.method).toBe("PUT");
    req.flush(returnedTenant);
  });

  it("should return response whose status is 200 if tenant deletion succeeds", () => {
    tenantService.deleteTenant(passedTenant.id).subscribe((response) => {
      expect(response.status).toBe(200);
    });
    const req = httpTestingController.expectOne(
      tenantEndpoint + "/" + passedTenant.id
    );
    expect(req.request.method).toBe("DELETE");
    req.flush({ status: 200 });
  });
});
