import { FND_EDU_URL, getBaseHeaders } from "@/lib/utils";
import { BaseService } from "./base.service";
import { toast } from "sonner";
import { Student } from "../entities/student/student";
import { CreateStudentPayload } from "../entities/student/createStudent";

export class StudentService extends BaseService<Student> {
    constructor(session: any) {
        super(FND_EDU_URL || "", "students", "aluno", session);
    }

    async findByUserEmail(email: string): Promise<Student | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/email/${email}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao obter ${this.displayName}. ${error.detail}`);
            }
        } catch (error) {
            toast.error(`Erro ao buscar ${this.displayName}: ${error}`);
        }
        return null;
    }

    async findAllByCouseAndYear(courseId: string, year: number): Promise<Student[]> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/course/${courseId}/year/${year}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao obter ${this.displayName}s. ${error.detail}`);
                return [];
            }
        } catch (error) {
            toast.error(`Erro ao buscar ${this.displayName}: ${error}`);
            return [];
        }
    }

    async countAll(): Promise<number | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/count`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao obter o número de ${this.entity}s. ${error.detail}`);
                return null;
            }
        } catch (error) {
            toast.error(`Erro ao buscar ${this.displayName}: ${error}`);
            return null;
        }
    }

    async countNonGraduatedByCourse(courseId: string): Promise<number | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/count/course/${courseId}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao obter o número de ${this.entity}s. ${error.detail}`);
                return null;
            }
        } catch (error) {
            toast.error(`Erro ao buscar ${this.displayName}: ${error}`);
            return null;
        }
    }

    async countAllByYear(year: number): Promise<number | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/count/year/${year}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao obter o número de ${this.entity}s. ${error.detail}`);
                return null;
            }
        } catch (error) {
            toast.error(`Erro ao buscar ${this.displayName}: ${error}`);
            return null;
        }
    }

    async saveStudent(data: CreateStudentPayload): Promise<Student | null> {
        return super.save(data as any)
    }

    async updateStudent(data: CreateStudentPayload): Promise<Student | null> {
        return super.update(data as any)
    }

}
