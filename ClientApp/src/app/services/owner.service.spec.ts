import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { OwnerService } from "./owner.service";
import { QueryResult } from "../models/query/queryResult";
import { Owner } from "../models/owner";

describe("OwnerService", () => {
  let ownerService: OwnerService,
    httpTestingController: HttpTestingController,
    query = {};
  const ownerEndpoint = "/api/owners";

  const queryResult: QueryResult<Owner> = {
    totalItems: 3,
    items: [
      {
        name: "Owner1",
        email: "owner1@example.com",
        mobile: "0412345678",
        id: 1,
      },
      {
        name: "Owner2",
        email: "owner2@example.com",
        mobile: "0412345679",
        id: 2,
      },
      {
        name: "Owner3",
        email: "owner3@example.com",
        mobile: "0412345670",
        id: 3,
      },
    ],
  };

  const passedOwner: Owner = {
    name: "Owner4",
    email: "owner4@example.com",
    mobile: "0412345674",
    id: 4,
  };

  const returnedOwner: Owner = {
    name: "Owner4",
    email: "owner4@example.com",
    mobile: "0412345674",
    id: 4,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OwnerService],
    });
    ownerService = TestBed.inject(OwnerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(ownerService).toBeTruthy();
  });

  it("should return a query result with all owners", () => {
    ownerService
      .getOwners(query)
      .subscribe((queryResult: QueryResult<Owner>) => {
        expect(queryResult).toBeTruthy();
        expect(queryResult.totalItems).toBeGreaterThan(0);
      });
    const req = httpTestingController.expectOne(ownerEndpoint);
    expect(req.request.method).toBe("GET");
    req.flush({ ...queryResult });
  });

  it("should return the new owner if owner creation succeeds", () => {
    ownerService.createOwner(passedOwner).subscribe((response) => {
      expect(response.name).toEqual(passedOwner.name);
      expect(response.email).toEqual(passedOwner.email);
      expect(response.mobile).toEqual(passedOwner.mobile);
    });
    const req = httpTestingController.expectOne(ownerEndpoint);
    expect(req.request.method).toBe("POST");
    req.flush(returnedOwner);
  });

  it("should return the updated owner if owner update succeeds", () => {
    ownerService.updateOwner(passedOwner).subscribe((response) => {
      expect(response.name).toEqual(passedOwner.name);
      expect(response.email).toEqual(passedOwner.email);
      expect(response.mobile).toEqual(passedOwner.mobile);
      expect(response.id).toEqual(passedOwner.id);
    });
    const req = httpTestingController.expectOne(
      ownerEndpoint + "/" + passedOwner.id
    );
    expect(req.request.method).toBe("PUT");
    req.flush(returnedOwner);
  });

  it("should return response whose status is 200 if owner deletion succeeds", () => {
    ownerService.deleteOwner(passedOwner.id).subscribe((response) => {
      expect(response.status).toBe(200);
    });
    const req = httpTestingController.expectOne(
      ownerEndpoint + "/" + passedOwner.id
    );
    expect(req.request.method).toBe("DELETE");
    req.flush({ status: 200 });
  });
});
