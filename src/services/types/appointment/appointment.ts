import { AuditableBaseEntity } from "../common/entity";

export enum AppointmentStatus {
    PENDING,
    COMPLETED,
    CANCELLED
}

export type Appointment = AuditableBaseEntity & {
    guestId: number;
    staffId: number;
    serviceId: number;
    status: AppointmentStatus;
    startTime: string;
    endTime: string;
}


export type AddAppointmentRequest = Pick<Appointment, 'guestId' | 'staffId' | 'serviceId' | 'startTime' | 'endTime' | 'status'>;

