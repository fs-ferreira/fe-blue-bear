import { SemesterYearPeriod } from "../../enums/semesterYearPeriod.enum";

export interface CourseSemesterInfo {
    courseName:string;
    year:number;
    semesterOfYear:SemesterYearPeriod;
    sequentialKey:string;
    semesterSequenceId:string;
    label?: string;
}