import { PaymentStatus } from "../../enums/paymentStatus.enum";
import { BaseEntity } from "../basics/baseEntity";
import { Student } from "../student/student";

export interface Payment extends BaseEntity {
    student:Student;
    amount:number;
    dueDate:Date;
    status:PaymentStatus;
}