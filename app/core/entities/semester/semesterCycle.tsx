import { CourseSummary } from "../course/courseSummary";
import { Semester } from "./semester";

export interface SemesterCycle {
    sequentialKey: String;
    course: CourseSummary;
    semesters: Semester[];
}