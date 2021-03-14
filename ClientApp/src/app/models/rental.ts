import { Owner } from "./owner";
import { Property } from "./property";
import { Tenant } from "./tenant";

export interface Rental
{
    property: Property;
    propertyId: number;
    tenant: Tenant;
    tenantId: number;
    startDate: string;
    endDate: string;
    payment: number;
    id: number;
}