export interface UserPermission {
    resource: String;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
}