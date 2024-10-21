import { PaymentStatus } from "../../enums/paymentStatus.enum";
import { BaseEntity } from "../basics/baseEntity";
import { StudentSummary } from "../student/studentSummary";

export interface PaymentSummary extends BaseEntity{
    student: StudentSummary;
    amount: number;
    dueDate: Date;
    status: PaymentStatus;
}