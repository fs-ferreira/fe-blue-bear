import { Classroom } from "../classroom/classroom";
import { Attendance } from "./attendance";

export interface ClassroomAttendances {
    classroom: Classroom;
    attendances: Attendance[];
}