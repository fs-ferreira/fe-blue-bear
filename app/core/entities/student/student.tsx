import { StudentSummary } from "./studentSummary";

export interface Student extends StudentSummary {
    dateOfBirth: Date;
    graduated: Boolean;
    tuitionDiscount: number;
    rg: string;
    cpf: string;
    cep: string;
    street: string;
    houseNumber: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;

    [key: string]: any; 
}