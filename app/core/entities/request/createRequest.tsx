import { RequestStatus } from "../../enums/requestStatus.enum";
import { RequestType } from "../../enums/requestType.enum";
import { Student } from "../student/student";

export interface RequestPayload {
    studentRa: string;
    requestType: RequestType;
    description?: string;
    status: RequestStatus;
    title: string;
    protocolNumber?: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}