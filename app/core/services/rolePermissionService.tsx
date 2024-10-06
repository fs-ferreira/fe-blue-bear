import { CORE_URL, getBaseHeaders } from "@/lib/utils";
import { UserPermission } from "../entities/rolePermissions/userPermission";
import { BaseService } from "./baseService";
import { toast } from "sonner";

export class RolePermissionService extends BaseService<UserPermission> {
    constructor(session: any) {
        super(CORE_URL || "", "rolePermission", "recurso", session);
    }

    async findAllByRoleName(role: string): Promise<UserPermission[]> {
        const response = await fetch(`${this.baseUrl}/rolePermission/${role}`, {
            method: 'GET',
            headers: getBaseHeaders(this.session),
        });

        if (response.ok) {
            return await response.json();;
        } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao recuperar as permissõe do cargo. ${error.detail}`);
        }

        return [];
    }
}