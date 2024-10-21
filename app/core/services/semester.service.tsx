import { toast } from 'sonner';
import { BaseService } from './base.service';
import { Semester } from '../entities/semester/semester';
import { FND_EDU_URL, getBaseHeaders } from '@/lib/utils';
import { SemesterCycle } from '../entities/semester/semesterCycle';
import { CreateSemesterCycle } from '../entities/semester/createSemesterCycle';
import { CourseSemesterInfo } from '../entities/semester/courseSemesterInfo';

export class SemesterService extends BaseService<Semester> {
  constructor(session: any) {
    super(FND_EDU_URL || '', 'semesters', 'semestre', session);
  }

  async findAllByYear(year: number): Promise<Semester[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/byYear/${year}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar os semestres por ano. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao buscar os semestres por ano: ${error}`);
      return null;
    }
  }

  async findAllByDisciplineId(disciplineId: string): Promise<Semester[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/discipline/${disciplineId}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Nenhum semestre encontrado. ${error.detail}`);
        return [];
      }
    } catch (error) {
      toast.error(`Erro ao buscar os semestres por disciplina: ${error}`);
      return [];
    }
  }

  async findAllByProfessorId(professorId: string): Promise<Semester[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/professor/${professorId}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Nenhum semestre encontrado. ${error.detail}`);
        return [];
      }
    } catch (error) {
      toast.error(`Erro ao buscar os semestres pelo professor: ${error}`);
      return [];
    }
  }

  async findAllBySequentialKey(sequentialKey: string): Promise<SemesterCycle | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/sequence/${sequentialKey}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar o ciclo de semestres pela chave sequencial. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao buscar o ciclo de semestres pela chave sequencial: ${error}`);
      return null;
    }
  }

  async createNewSemesterCycle(semesterCycle: CreateSemesterCycle): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}`, {
        method: 'POST',
        headers: {
          ...getBaseHeaders(this.session),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(semesterCycle),
      });

      if (response.ok) {
        return await response.text();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao criar o novo ciclo de semestre. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao criar o novo ciclo de semestre: ${error}`);
      return null;
    }
  }

  async findAllUniqueSequentialKeys(): Promise<CourseSemesterInfo[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/periods`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar os ciclos dísponiveis. ${error.detail}`);
        return [];
      }
    } catch (error) {
      toast.error(`Erro ao buscar os ciclos dísponiveis: ${error}`);
      return [];
    }
  }

  async findByStudentRa(studentRa: string): Promise<SemesterCycle | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/sequence/student/${studentRa}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar o ciclo de semestres pelo RA do aluno. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao buscar o ciclo de semestres pelo RA do aluno: ${error}`);
      return null;
    }
  }

}
