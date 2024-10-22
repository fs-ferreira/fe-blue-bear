import { GradeDisciplineStatus } from "../../enums/gradeDisciplineStatus.enum";

export interface UpdateGrade {
    gradeValue: number;
    status: GradeDisciplineStatus;

}