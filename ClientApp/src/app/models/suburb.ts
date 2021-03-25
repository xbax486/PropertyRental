import { State } from "./state";

export interface Suburb
{
    name: string;
    postcode: string;
    state: State;
    stateId: number;
    id: number;
}