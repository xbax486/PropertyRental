import { Owner } from './owner';
import { Suburb } from './suburb';
import { PropertyType } from "./propertyType";

export interface Property {
    owner: Owner;
    ownerId: number;
    unit: string;
    street: string;
    suburb: Suburb;
    suburbId: number;
    propertyType: PropertyType;
    propertyTypeId: number;
    bedroom: number;
    bathroom: number;
    parking: number;
    petsAllowed: boolean;
    builtInWardrobe: boolean;
    gasAvailable: boolean;
    hasStudyRoom: boolean;
    furnished: boolean;
    available: boolean;
    id: number;
}