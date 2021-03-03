import { Suburb } from './suburb';
import { PropertyType } from "./propertyType";

export interface Property {
    unit: string;
    street: string;
    suburb: Suburb;
    propertyType: PropertyType;
    bedroom: number;
    bathroom: number;
    parking: number;
    petsAllowed: boolean;
    builtInWardrobe: boolean;
    gasAvailable: boolean;
    hasStudyRoom: boolean;
    furnished: boolean;
    id: number;
}