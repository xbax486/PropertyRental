import { Query } from './query';

export interface TenantQuery extends Query {
    available: number;
}