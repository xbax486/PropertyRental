import { State } from "./state";

export interface Suburb
{
    name: string;
    postcode: number;
    state: State;
    stateId: number;
    id: number;
}