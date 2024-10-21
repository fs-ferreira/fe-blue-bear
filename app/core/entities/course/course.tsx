import { CourseType } from "../../enums/courseType.enum";
import { BaseEntity } from "../basics/baseEntity";
import { Discipline } from "../discipline/discipline";

export interface Course extends BaseEntity {
    courseName:string;
    courseType:CourseType;
    description:string;
    numberOfSemesters:number;
    monthlyFee:number;
    disciplines:Discipline[];
}