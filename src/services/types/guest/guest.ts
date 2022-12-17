import { AuditableBaseEntity } from "../common/entity";

export type Guest = AuditableBaseEntity & {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}