import { CORE_URL } from "@/lib/utils";
import { Role } from "../entities/role/role";
import { BaseService } from "./base.service";

export class RoleService extends BaseService<Role> {
    constructor(session: any) {
        super(CORE_URL || "", "roles", "cargo", session);
    }
}
