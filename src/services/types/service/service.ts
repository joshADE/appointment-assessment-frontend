import { AuditableBaseEntity } from "../common/entity";

export type Service = AuditableBaseEntity & {
    name: string;
    category: string;
    price: number;
}


export type AddServiceRequest = Pick<Service, 'name' | 'category' | 'price'>