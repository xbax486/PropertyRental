import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { RentalService } from "./rental.service";
import { QueryResult } from "../models/query/queryResult";
import { Rental } from "../models/rental";

describe('RentalService', () => {
  let rentalService: RentalService,
    httpTestingController: HttpTestingController,
    query = {};

  const rentalEndpoint = "/api/rentals";
  const queryResult: QueryResult<Rental> = {
    totalItems: 3,
    items: [
      {
        property: { 
          owner: {
            name: "Owner 1",
            email: "owner1@example.com",
            mobile: "0412345671",
            id: 1,
          },
          ownerId: 1,
          unit: "79",
          street: "89 Test Street",
          suburb: {
            name: "Test suburb 4",
            postcode: "2052",
            state: {
              name: "New South Wales",
              acronym: "NSW",
              id: 1,
            },
            stateId: 1,
            id: 4,
          },
          suburbId: 4,
          propertyType: {
            name: "House",
            id: 1,
          },
          propertyTypeId: 1,
          bedroom: 2,
          bathroom: 2,
          parking: 1,
          petsAllowed: false,
          builtInWardrobe: false,
          gasAvailable: true,
          hasStudyRoom: false,
          furnished: false,
          available: true,
          id: 3
        },
        propertyId: 1,
        tenant: {
          name: "Tenant 1",
          email: "tenant1@example.com",
          mobile: "0412345661",
          id: 1
        },
        tenantId: 1,
        startDate: '01/10/2019',
        endDate: '15/05/2020',
        payment: 300,
        id: 1
      },
      {
        property: { 
          owner: {
            name: "Owner 2",
            email: "owner2@example.com",
            mobile: "0412345672",
            id: 2,
          },
          ownerId: 2,
          unit: "79",
          street: "29 Test Street",
          suburb: {
            name: "Test suburb 4",
            postcode: "2052",
            state: {
              name: "New South Wales",
              acronym: "NSW",
              id: 1,
            },
            stateId: 1,
            id: 4,
          },
          suburbId: 4,
          propertyType: {
            name: "House",
            id: 1,
          },
          propertyTypeId: 1,
          bedroom: 2,
          bathroom: 2,
          parking: 1,
          petsAllowed: false,
          builtInWardrobe: false,
          gasAvailable: true,
          hasStudyRoom: false,
          furnished: false,
          available: true,
          id: 2
        },
        propertyId: 2,
        tenant: {
          name: "Tenant 2",
          email: "tenant2@example.com",
          mobile: "0412345662",
          id: 2
        },
        tenantId: 2,
        startDate: '01/10/2018',
        endDate: '15/05/2019',
        payment: 500,
        id: 2
      },
      {
        property: { 
          owner: {
            name: "Owner 1",
            email: "owner1@example.com",
            mobile: "0412345671",
            id: 1,
          },
          ownerId: 1,
          unit: "79",
          street: "89 Test Street",
          suburb: {
            name: "Test suburb 4",
            postcode: "2052",
            state: {
              name: "New South Wales",
              acronym: "NSW",
              id: 1,
            },
            stateId: 1,
            id: 4,
          },
          suburbId: 4,
          propertyType: {
            name: "House",
            id: 1,
          },
          propertyTypeId: 1,
          bedroom: 2,
          bathroom: 2,
          parking: 1,
          petsAllowed: false,
          builtInWardrobe: false,
          gasAvailable: true,
          hasStudyRoom: false,
          furnished: false,
          available: true,
          id: 3
        },
        propertyId: 3,
        tenant: {
          name: "Tenant 1",
          email: "tenant@example.com",
          mobile: "0412345661",
          id: 1
        },
        tenantId: 1,
        startDate: '01/10/2020',
        endDate: '15/05/2021',
        payment: 400,
        id: 3
      },
    ],
  };
  const passedRental: Rental = {
    property: { 
      owner: {
        name: "Owner 1",
        email: "owner1@example.com",
        mobile: "0412345671",
        id: 1,
      },
      ownerId: 1,
      unit: "79",
      street: "89 Test Street",
      suburb: {
        name: "Test suburb 4",
        postcode: "2052",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 4,
      },
      suburbId: 4,
      propertyType: {
        name: "House",
        id: 1,
      },
      propertyTypeId: 1,
      bedroom: 2,
      bathroom: 2,
      parking: 1,
      petsAllowed: false,
      builtInWardrobe: false,
      gasAvailable: true,
      hasStudyRoom: false,
      furnished: false,
      available: true,
      id: 3
    },
    propertyId: 1,
    tenant: {
      name: "Tenant 1",
      email: "tenant1@example.com",
      mobile: "0412345661",
      id: 1
    },
    tenantId: 1,
    startDate: '01/10/2019',
    endDate: '15/05/2020',
    payment: 300,
    id: 1
  };

  const returnedRental: Rental = {
    property: { 
      owner: {
        name: "Owner 1",
        email: "owner1@example.com",
        mobile: "0412345671",
        id: 1,
      },
      ownerId: 1,
      unit: "79",
      street: "89 Test Street",
      suburb: {
        name: "Test suburb 4",
        postcode: "2052",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 4,
      },
      suburbId: 4,
      propertyType: {
        name: "House",
        id: 1,
      },
      propertyTypeId: 1,
      bedroom: 2,
      bathroom: 2,
      parking: 1,
      petsAllowed: false,
      builtInWardrobe: false,
      gasAvailable: true,
      hasStudyRoom: false,
      furnished: false,
      available: true,
      id: 3
    },
    propertyId: 1,
    tenant: {
      name: "Tenant 1",
      email: "tenant1@example.com",
      mobile: "0412345661",
      id: 1
    },
    tenantId: 1,
    startDate: '01/10/2019',
    endDate: '15/05/2020',
    payment: 300,
    id: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RentalService],
    });
    rentalService = TestBed.inject(RentalService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(rentalService).toBeTruthy();
  });

  it("should return a query result with all properties", () => {
    rentalService
      .getRentals(query)
      .subscribe((queryResult: QueryResult<Rental>) => {
        expect(queryResult).toBeTruthy();
        expect(queryResult.totalItems).toBeGreaterThan(0);
      });
    const req = httpTestingController.expectOne(rentalEndpoint);
    expect(req.request.method).toBe("GET");
    req.flush({ ...queryResult });
  });

  it("should return the new property if property creation succeeds", () => {
    rentalService.createRental(passedRental).subscribe((response) => {
      expect(response.propertyId).toEqual(passedRental.propertyId);
      expect(response.tenantId).toEqual(passedRental.tenantId);
      expect(response.startDate).toEqual(passedRental.startDate);
      expect(response.endDate).toEqual(passedRental.endDate);
      expect(response.payment).toEqual(passedRental.payment);
    });
    const req = httpTestingController.expectOne(rentalEndpoint);
    expect(req.request.method).toBe("POST");
    req.flush(returnedRental);
  });

  it("should return the updated property if property update succeeds", () => {
    rentalService.updateRental(passedRental).subscribe((response) => {
      expect(response.propertyId).toEqual(passedRental.propertyId);
      expect(response.tenantId).toEqual(passedRental.tenantId);
      expect(response.startDate).toEqual(passedRental.startDate);
      expect(response.endDate).toEqual(passedRental.endDate);
      expect(response.payment).toEqual(passedRental.payment);
      expect(response.id).toEqual(passedRental.id);
    });
    const req = httpTestingController.expectOne(
      rentalEndpoint + "/" + passedRental.id
    );
    expect(req.request.method).toBe("PUT");
    req.flush(returnedRental);
  });

  it("should return response whose status is 200 if property deletion succeeds", () => {
    rentalService.deleteRental(passedRental.id).subscribe((response) => {
      expect(response.status).toBe(200);
    });
    const req = httpTestingController.expectOne(
      rentalEndpoint + "/" + passedRental.id
    );
    expect(req.request.method).toBe("DELETE");
    req.flush({ status: 200 });
  });
});
