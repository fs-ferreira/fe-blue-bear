import { UserPermission } from "../entities/rolePermission/userPermission";

const PERMISSIONS_KEY = "user_permissions";

export const permissionService = {
    setPermissions(permissions: any[]): void {
        localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
    },

    clearPermissions(): void {
        localStorage.removeItem(PERMISSIONS_KEY)
    },

    getPermissions(): UserPermission[] {
        const permissions = localStorage.getItem(PERMISSIONS_KEY);
        return permissions ? JSON.parse(permissions) : [];
    },

    getPermissionByResource(resource: string) {
        const permissions = this.getPermissions();
        return permissions.find((permission: UserPermission) => permission.resource === resource);
    }
};
