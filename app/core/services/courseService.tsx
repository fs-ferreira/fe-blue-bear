import { FND_EDU_URL, getBaseHeaders } from "@/lib/utils";
import { Course } from "../entities/courses/course";
import { AddDisciplinesToCourse } from "../entities/disciplines/addDisciplinesToCourse";
import { BaseService } from "./baseService";
import { toast } from "sonner";

export class CourseService extends BaseService<Course> {
    constructor(session: any) {
        super(FND_EDU_URL || "", "courses", "curso", session);
    }

    async addDisciplinesToCourse(dto: AddDisciplinesToCourse): Promise<Course | null> {
        const response = await fetch(`${this.baseUrl}/courses/addDisciplines`, {
            method: 'PUT',
            headers: getBaseHeaders(this.session),
            body: JSON.stringify(dto)
        });

        if (response.ok) {
            toast.success('Permissões salvas com sucesso!');
            return await response.json();;
        } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao adicionar disciplinas ao curso. ${error.detail}`);
        }

        return null;
    }
}
