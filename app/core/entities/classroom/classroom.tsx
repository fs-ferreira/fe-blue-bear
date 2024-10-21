import { Semester } from "../semester/semester";
import { StudentSummary } from "../student/studentSummary";
import { ClassroomSummary } from "./classroomSumary";

export interface Classroom extends ClassroomSummary {
    semester:Semester;
    students:StudentSummary[];
}