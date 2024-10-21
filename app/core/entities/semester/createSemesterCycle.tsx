import { SemesterYearPeriod } from "../../enums/semesterYearPeriod.enum";

export interface CreateSemesterCycle {
    courseId: string;
    year: number;
    period: SemesterYearPeriod;
}