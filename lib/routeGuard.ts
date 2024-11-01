"use client"

import { permissionService } from "@/app/core/services/permission.service";

export const canView = (resources: string[]): boolean => {
    const permissions = permissionService.getPermissions();

    return resources.every(resource => {
        const permission = permissions.find(p => p.resource === resource);
        return permission ? permission.view === true : false;
    });
};
