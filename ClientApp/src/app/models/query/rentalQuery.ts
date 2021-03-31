import { Query } from "./query";

export interface RentalQuery extends Query {
    stateId: number;
    suburbId: number;
}