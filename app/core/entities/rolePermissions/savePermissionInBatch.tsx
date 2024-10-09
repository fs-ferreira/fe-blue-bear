import { UserPermission } from "./userPermission";

export interface SavePermissionInBatch {
    resourcePermissions: UserPermission[];
    roleName: string;
}