import { CORE_URL } from "@/lib/utils";
import { Role } from "../entities/roles/role";
import { BaseService } from "./baseService";

export class RoleService extends BaseService<Role> {
    constructor(session: any) {
        super(CORE_URL || "", "roles", "cargo", session);
    }
}
