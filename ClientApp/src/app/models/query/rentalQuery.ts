import { Query } from "./query";

export interface RentalQuery extends Query {
    stateId: number;
    suburbId: number;
    minimumRent: number;
    maximumRent: number;
    startDate: string,
    endDate: string,
}