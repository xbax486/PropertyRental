import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { PropertyService } from "./property.service";
import { QueryResult } from "../models/query/queryResult";
import { Property } from "../models/property";

describe("PropertyService", () => {
  let propertyService: PropertyService,
    httpTestingController: HttpTestingController,
    query = {};

  const propertyEndpoint = "/api/properties";
  const queryResult: QueryResult<Property> = {
    totalItems: 3,
    items: [
      {
        owner: {
          name: "Owner 1",
          email: "owner1@example.com",
          mobile: "0412345671",
          id: 1,
        },
        ownerId: 1,
        unit: "123",
        street: "45 Test Street",
        suburb: {
          name: "Test suburb 1",
          postcode: "2050",
          state: {
            name: "New South Wales",
            acronym: "NSW",
            id: 1,
          },
          stateId: 1,
          id: 1,
        },
        suburbId: 1,
        propertyType: {
          name: "House",
          id: 1,
        },
        propertyTypeId: 1,
        bedroom: 1,
        bathroom: 1,
        parking: 1,
        petsAllowed: true,
        builtInWardrobe: true,
        gasAvailable: false,
        hasStudyRoom: false,
        furnished: false,
        available: true,
        id: 1,
      },
      {
        owner: {
          name: "Owner 2",
          email: "owner2@example.com",
          mobile: "0412345672",
          id: 2,
        },
        ownerId: 2,
        unit: "45",
        street: "78 Test Street",
        suburb: {
          name: "Test suburb 2",
          postcode: "2051",
          state: {
            name: "New South Wales",
            acronym: "NSW",
            id: 1,
          },
          stateId: 1,
          id: 2,
        },
        suburbId: 2,
        propertyType: {
          name: "Unit",
          id: 2,
        },
        propertyTypeId: 1,
        bedroom: 2,
        bathroom: 2,
        parking: 1,
        petsAllowed: true,
        builtInWardrobe: true,
        gasAvailable: true,
        hasStudyRoom: false,
        furnished: false,
        available: true,
        id: 2,
      },
      {
        owner: {
          name: "Owner 3",
          email: "owner3@example.com",
          mobile: "0412345673",
          id: 3,
        },
        ownerId: 3,
        unit: "78",
        street: "89 Test Street",
        suburb: {
          name: "Test suburb 3",
          postcode: "2051",
          state: {
            name: "New South Wales",
            acronym: "NSW",
            id: 1,
          },
          stateId: 1,
          id: 3,
        },
        suburbId: 3,
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
        id: 3,
      },
    ],
  };

  const passedProperty: Property = {
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
  };

  const returnedProperty: Property = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PropertyService],
    });
    propertyService = TestBed.inject(PropertyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(propertyService).toBeTruthy();
  });

  it("should return a query result with all properties", () => {
    propertyService
      .getProperties(query)
      .subscribe((queryResult: QueryResult<Property>) => {
        expect(queryResult).toBeTruthy();
        expect(queryResult.totalItems).toBeGreaterThan(0);
      });
    const req = httpTestingController.expectOne(propertyEndpoint);
    expect(req.request.method).toBe("GET");
    req.flush({ ...queryResult });
  });

  it("should return the new property if property creation succeeds", () => {
    propertyService.createProperty(passedProperty).subscribe((response) => {
      expect(response.ownerId).toEqual(passedProperty.ownerId);
      expect(response.suburbId).toEqual(passedProperty.suburbId);
      expect(response.propertyTypeId).toEqual(passedProperty.propertyTypeId);
    });
    const req = httpTestingController.expectOne(propertyEndpoint);
    expect(req.request.method).toBe("POST");
    req.flush(returnedProperty);
  });

  it("should return the updated property if property update succeeds", () => {
    propertyService.updateProperty(passedProperty).subscribe((response) => {
      expect(response.ownerId).toEqual(passedProperty.ownerId);
      expect(response.suburbId).toEqual(passedProperty.suburbId);
      expect(response.propertyTypeId).toEqual(passedProperty.propertyTypeId);
      expect(response.id).toEqual(passedProperty.id);
    });
    const req = httpTestingController.expectOne(
      propertyEndpoint + "/" + passedProperty.id
    );
    expect(req.request.method).toBe("PUT");
    req.flush(returnedProperty);
  });

  it("should return response whose status is 200 if property deletion succeeds", () => {
    propertyService.deleteProperty(passedProperty.id).subscribe((response) => {
      expect(response.status).toBe(200);
    });
    const req = httpTestingController.expectOne(
      propertyEndpoint + "/" + passedProperty.id
    );
    expect(req.request.method).toBe("DELETE");
    req.flush({ status: 200 });
  });
});
