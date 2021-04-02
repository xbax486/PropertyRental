import { Query } from "./query";

export interface SuburbQuery extends Query {
    postcode: string;
    stateId: number;
}