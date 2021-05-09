import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { SuburbService } from "./suburb.service";
import { QueryResult } from "../models/query/queryResult";
import { Suburb } from "../models/suburb";

describe('SuburbService', () => {
  let suburbService: SuburbService,
    httpTestingController: HttpTestingController,
    query = {};

  const suburbEndpoint = "/api/suburbs";
  const queryResult: QueryResult<Suburb> = {
    totalItems: 3,
    items: [
      {
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
      {
        name: "Test suburb 2",
        postcode: "2050",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 2,
      },
      {
        name: "Test suburb 3",
        postcode: "2050",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 3,
      },
    ],
  };

  const passedSuburb: Suburb = {
    name: "Test suburb 1",
        postcode: "2050",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 1,
  };

  const returnedSuburb: Suburb = {
    name: "Test suburb 1",
        postcode: "2050",
        state: {
          name: "New South Wales",
          acronym: "NSW",
          id: 1,
        },
        stateId: 1,
        id: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuburbService],
    });
    suburbService = TestBed.inject(SuburbService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(suburbService).toBeTruthy();
  });

  it("should return a query result with all suburbs", () => {
    suburbService
      .getSuburbs(query)
      .subscribe((queryResult: QueryResult<Suburb>) => {
        expect(queryResult).toBeTruthy();
        expect(queryResult.totalItems).toBeGreaterThan(0);
      });
    const req = httpTestingController.expectOne(suburbEndpoint);
    expect(req.request.method).toBe("GET");
    req.flush({ ...queryResult });
  });

  it("should return the new suburb if suburb creation succeeds", () => {
    suburbService.createSuburb(passedSuburb).subscribe((response) => {
      expect(response.name).toEqual(passedSuburb.name);
      expect(response.postcode).toEqual(passedSuburb.postcode);
      expect(response.stateId).toEqual(passedSuburb.stateId);
    });
    const req = httpTestingController.expectOne(suburbEndpoint);
    expect(req.request.method).toBe("POST");
    req.flush(returnedSuburb);
  });

  it("should return the updated suburb if suburb update succeeds", () => {
    suburbService.updateSuburb(passedSuburb).subscribe((response) => {
      expect(response.name).toEqual(passedSuburb.name);
      expect(response.postcode).toEqual(passedSuburb.postcode);
      expect(response.stateId).toEqual(passedSuburb.stateId);
      expect(response.id).toEqual(passedSuburb.id);
    });
    const req = httpTestingController.expectOne(
      suburbEndpoint + "/" + passedSuburb.id
    );
    expect(req.request.method).toBe("PUT");
    req.flush(returnedSuburb);
  });

  it("should return response whose status is 200 if suburb deletion succeeds", () => {
    suburbService.deleteSuburb(passedSuburb.id).subscribe((response) => {
      expect(response.status).toBe(200);
    });
    const req = httpTestingController.expectOne(
      suburbEndpoint + "/" + passedSuburb.id
    );
    expect(req.request.method).toBe("DELETE");
    req.flush({ status: 200 });
  });
});
