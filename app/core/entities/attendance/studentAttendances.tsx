import { StudentSummary } from "../student/studentSummary";
import { Attendance } from "./attendance";

export interface StudentAttendances {
    student: StudentSummary;
    attendances: Attendance[];
}