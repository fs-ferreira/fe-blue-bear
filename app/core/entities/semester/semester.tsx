import { SemesterYearPeriod } from "../../enums/semesterYearPeriod.enum";
import { BaseEntity } from "../basics/baseEntity";
import { Classroom } from "../classroom/classroom";
import { ClassroomSummary } from "../classroom/classroomSumary";
import { CourseSummary } from "../course/courseSummary";

export interface Semester extends BaseEntity {
    year: number;
    semesterOfYear: SemesterYearPeriod;
    course: CourseSummary;
    semesterNumber: number;
    classrooms: ClassroomSummary[];
}