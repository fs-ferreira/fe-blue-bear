import { CourseType } from "../../enums/courseType.enum";

export interface CourseSummary {
    courseName: string;
    courseType: CourseType;
    id: string;
    monthlyFee:number;
}