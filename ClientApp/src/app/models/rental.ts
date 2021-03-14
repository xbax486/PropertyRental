import { Owner } from "./owner";
import { Tenant } from "./tenant";

export interface Rental
{
    owner: Owner;
    ownerId: number;
    // unit: string;
    // street: string;
    suburb: string;
    state: string;
    propertyId: number;
    tenant: Tenant;
    tenantId: number;
    startDate: string;
    endDate: string;
    payment: number;
    id: number;
}