import { toast } from 'sonner';
import { Classroom } from '../entities/classroom/classroom';
import { BaseService } from './base.service';
import { FND_EDU_URL, getBaseHeaders } from '@/lib/utils';
import { AddStudentsToClassroomDto } from '../entities/classroom/addStudentsToClassroom';
import { CreateClassroom } from '../entities/classroom/createClassroom';

export class ClassroomService extends BaseService<Classroom> {
  constructor(session: any) {
    super(FND_EDU_URL || '', 'classrooms', 'sala de aula', session);
  }

  async findAllByProfessorIdAndYear(professorId: string, year: number): Promise<Classroom[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/professor/${professorId}/year/${year}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar as salas de aula por professor e ano. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao buscar as salas de aula por professor e ano: ${error}`);
      return null;
    }
  }

  async findAllBySemesterId(semesterId: string): Promise<Classroom[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/semester/${semesterId}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar as salas de aula por semestre. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao buscar as salas de aula por semestre: ${error}`);
      return null;
    }
  }

  async findAllByStudentRa(studentRa: string): Promise<Classroom[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/student/${studentRa}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar as salas de aula por RA de aluno. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao buscar as salas de aula por RA de aluno: ${error}`);
      return null;
    }
  }

  async findAllByStudentRaAndSemesterId(studentRa: string, semesterId: string): Promise<Classroom[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/student/${studentRa}/semester/${semesterId}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar as salas de aula por RA de aluno e semestre. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao buscar as salas de aula por RA de aluno e semestre: ${error}`);
      return null;
    }
  }

  async addStudentsToClassroom(data: AddStudentsToClassroomDto): Promise<Classroom | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/${data.classroomId}/students`, {
        method: 'PUT',
        headers: {
          ...getBaseHeaders(this.session),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao adicionar alunos à sala de aula. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao adicionar alunos à sala de aula: ${error}`);
      return null;
    }
  }

  async createClassroom(data: CreateClassroom): Promise<Classroom | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}`, {
        method: 'POST',
        headers: {
          ...getBaseHeaders(this.session),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(`Sala criada com sucesso!`);
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Não foi possível criar a sala de aula. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao criar a sala de aula: ${error}`);
      return null;
    }
  }
}
