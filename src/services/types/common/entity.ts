export type AuditableBaseEntity = {
    id: number;
    created: string; // DateTime
    lastModified?: string; // DateTime
}