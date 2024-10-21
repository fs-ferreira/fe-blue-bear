export interface UserPermission {
    resource: string;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
}