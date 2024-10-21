import { RequestStatus } from "../../enums/requestStatus.enum";
import { RequestType } from "../../enums/requestType.enum";
import { BaseEntity } from "../basics/baseEntity";
import { Student } from "../student/student";

export interface Request extends BaseEntity {
    student:Student;
    requestType:RequestType;
    description:string;
    status:RequestStatus;
    title:string;
    protocolNumber:string;
}