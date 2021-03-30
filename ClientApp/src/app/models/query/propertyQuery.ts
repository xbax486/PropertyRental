import { Query } from "./query";

export interface PropertyQuery extends Query {
    stateId: number;
    suburbId: number;
    available: number;
}