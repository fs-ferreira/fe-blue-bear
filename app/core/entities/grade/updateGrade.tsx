import { GradeDisciplineStatus } from "../../enums/gradeDisciplineStatus.enum";

export interface UpdateGradeDto {
    gradeValue: number;
    status: GradeDisciplineStatus;

}