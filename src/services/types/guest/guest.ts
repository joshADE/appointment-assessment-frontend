import { AuditableBaseEntity } from "../common/entity";

export type Guest = AuditableBaseEntity & {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}


export type AddGuestRequest = Pick<Guest, 'firstName' | 'lastName' | 'phone' | 'email'>