import { BaseEntity } from "../basics/baseEntity";

export interface Discipline extends BaseEntity {
    name: string;
    creditHours: number;
}