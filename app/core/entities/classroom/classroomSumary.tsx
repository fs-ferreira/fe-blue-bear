import { BaseEntity } from "../basics/baseEntity";
import { Discipline } from "../discipline/discipline";
import { User } from "../user/user";

export interface ClassroomSummary extends BaseEntity {
    discipline: Discipline;
    professor: User;
}