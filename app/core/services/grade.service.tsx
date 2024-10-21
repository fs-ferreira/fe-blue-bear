import { FND_EDU_URL, getBaseHeaders } from "@/lib/utils";
import { BaseService } from "./base.service";
import { CreateGradesInClassroom } from "../entities/grade/createGradesInClassroom";
import { toast } from "sonner";
import { Grade } from "../entities/grade/grade";

export class GradeService extends BaseService<Grade> {
    constructor(session: any) {
      super(FND_EDU_URL || '', 'grades', 'nota', session);
    }
  
    async createGradeForAllStudentsInClassroom(data: CreateGradesInClassroom): Promise<void> {
      try {
        const response = await fetch(`${this.baseUrl}/${this.entity}/createGrades`, {
          method: 'POST',
          headers: getBaseHeaders(this.session),
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
            toast.success('Notas criadas com sucesso!');
        } else {
          const error = await response.json();
          toast.error(`${error.status} - Erro ao criar notas para a sala. ${error.detail}`);
        }
      } catch (error) {
        toast.error(`Erro ao criar notas para a sala: ${error}`);
      }
    }
  
    async hasStudentPassedAllDisciplines(studentRa: string): Promise<boolean> {
      try {
        const response = await fetch(`${this.baseUrl}/${this.entity}/student/${studentRa}/passed`, {
          method: 'GET',
          headers: getBaseHeaders(this.session),
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          const error = await response.json();
          toast.error(`${error.status} - Erro ao verificar se o estudante passou em todas as disciplinas. ${error.detail}`);
          return false;
        }
      } catch (error) {
        toast.error(`Erro ao verificar se o estudante passou em todas as disciplinas: ${error}`);
        return false;
      }
    }
  
    async getAllGradesByStudentRaAndSemesterId(studentRa: string, semesterId: string): Promise<Grade[]> {
      try {
        const response = await fetch(`${this.baseUrl}/${this.entity}/student/${studentRa}/semester/${semesterId}`, {
          method: 'GET',
          headers: getBaseHeaders(this.session),
        });
  
        if (response.ok) {
          return await response.json();
        } else {
          const error = await response.json();
          toast.error(`${error.status} - Erro ao buscar notas do estudante. ${error.detail}`);
          return [];
        }
      } catch (error) {
        toast.error(`Erro ao buscar notas do estudante: ${error}`);
        return [];
      }
    }

    async getAllGradesByClassroomId(classroomId: string): Promise<Grade[]> {
        try {
          const response = await fetch(`${this.baseUrl}/${this.entity}/classroom/${classroomId}`, {
            method: 'GET',
            headers: getBaseHeaders(this.session),
          });
    
          if (response.ok) {
            return await response.json();
          } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao buscar notas da sala. ${error.detail}`);
            return [];
          }
        } catch (error) {
          toast.error(`Erro ao buscar notas da sala: ${error}`);
          return [];
        }
      }
    
      async getAllGradesByStudentRa(studentRa: string): Promise<Grade[]> {
        try {
          const response = await fetch(`${this.baseUrl}/${this.entity}/student/${studentRa}`, {
            method: 'GET',
            headers: getBaseHeaders(this.session),
          });
    
          if (response.ok) {
            return await response.json();
          } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao buscar as notas do aluno. ${error.detail}`);
            return [];
          }
        } catch (error) {
          toast.error(`Erro ao buscar as notas do aluno: ${error}`);
          return [];
        }
      }

       
      async getAllGradesByStudentEmail(studentEmail: string): Promise<Grade[]> {
        try {
          const response = await fetch(`${this.baseUrl}/${this.entity}/student/email/${studentEmail}`, {
            method: 'GET',
            headers: getBaseHeaders(this.session),
          });
    
          if (response.ok) {
            return await response.json();
          } else {
            const error = await response.json();
            toast.error(`${error.status} - Erro ao buscar as notas do aluno. ${error.detail}`);
            return [];
          }
        } catch (error) {
          toast.error(`Erro ao buscar as notas do aluno: ${error}`);
          return [];
        }
      }
  }