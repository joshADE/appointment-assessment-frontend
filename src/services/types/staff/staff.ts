import { AuditableBaseEntity } from "../common/entity";

export type Staff = AuditableBaseEntity & {
    firstName: string;
    lastName: string;
    jobTitle: string;
}


export type AddStaffRequest = Pick<Staff, 'firstName' | 'lastName' | 'jobTitle'>