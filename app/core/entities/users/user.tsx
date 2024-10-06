import { BaseEntity } from "../basics/baseEntity";

export interface User extends BaseEntity {
    fullName: string;
    email: string;
    roleName: string;
    active: boolean;
}