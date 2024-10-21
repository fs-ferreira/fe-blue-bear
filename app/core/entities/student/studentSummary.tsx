import { CourseSummary } from "../course/courseSummary";
import { User } from "../user/user";

export interface StudentSummary {
    ra: string;
    user: User;
    course: CourseSummary;
}