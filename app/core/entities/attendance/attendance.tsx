import { BaseEntity } from "../basics/baseEntity";
import { ClassroomSummary } from "../classroom/classroomSumary";
import { StudentSummary } from "../student/studentSummary";

export interface Attendance extends BaseEntity {
    classroom: ClassroomSummary;
    student: StudentSummary;
    attendanceDate: Date;
    present: boolean;
}