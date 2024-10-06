import { CORE_URL, getBaseHeaders } from "@/lib/utils";
import { User } from "../entities/users/user";
import { BaseService } from "./baseService";
import { RegisterUserDto } from "../entities/users/registerUserDto";
import { toast } from "sonner";
import { ChangePasswordDto } from "../entities/users/changePasswordDto";

export class UserService extends BaseService<User> {
    constructor(session: any) {
        super(CORE_URL || "", "users", "usuário", session);
    }


    async registerUser(data: RegisterUserDto): Promise<boolean | null> {
        const response = await fetch(`${this.baseUrl}/auth/signup`, {
            method: 'POST',
            headers: getBaseHeaders(this.session),
            body: JSON.stringify(data),
        });

        if (response.ok) {
            toast.success(`${this.displayName} criado com sucesso!`);
            return true;
        } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao criar ${this.displayName}. ${error.detail}`);
        }

        return null;
    }

    async changePassword(data: ChangePasswordDto): Promise<User | null> {
        const response = await fetch(`${this.baseUrl}/users/changePassword`, {
            method: 'PUT',
            headers: getBaseHeaders(this.session),
            body: JSON.stringify(data),
        });

        if (response.ok) {
            toast.success(`Senha alterada com sucesso!`);
            return await response.json();
        } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao alterar senha de ${this.displayName}. ${error.detail}`);
        }

        return null;
    }

    async disableUser(id: string): Promise<boolean | null> {
        const response = await fetch(`${this.baseUrl}/users/${id}/disable`, {
            method: 'DELETE',
            headers: getBaseHeaders(this.session),
        });

        if (response.ok) {
            toast.success(`${this.displayName} desativado com sucesso!`);
            return true;
        } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao desativar o usuário. ${error.detail}`);
        }

        return null;
    }

    async enableUser(email: string): Promise<boolean | null> {
        const response = await fetch(`${this.baseUrl}/users/${email}/enable`, {
            method: 'DELETE',
            headers: getBaseHeaders(this.session),
        });

        if (response.ok) {
            toast.success(`${this.displayName} desativado com sucesso!`);
            return true;
        } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao desativar o usuário. ${error.detail}`);
        }

        return null;
    }


}
