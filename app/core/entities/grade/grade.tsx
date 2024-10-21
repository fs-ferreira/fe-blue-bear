import { GradeDisciplineStatus } from "../../enums/gradeDisciplineStatus.enum";
import { BaseEntity } from "../basics/baseEntity";
import { Discipline } from "../discipline/discipline";
import { StudentSummary } from "../student/studentSummary";

export interface Grade extends BaseEntity {
    discipline: Discipline;
    student?: StudentSummary;
    gradeValue: number;
    status: GradeDisciplineStatus;
}