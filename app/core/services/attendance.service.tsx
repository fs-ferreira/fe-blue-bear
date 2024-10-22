import { FND_EDU_URL, getBaseHeaders } from '@/lib/utils';
import { toast } from 'sonner';
import { Attendance } from '../entities/attendance/attendance';
import { BaseService } from './base.service';
import { ClassroomAttendances } from '../entities/attendance/classroomAttendances';
import { CreateAttendances } from '../entities/attendance/createAttendances';
import { StudentAttendances } from '../entities/attendance/studentAttendances';

export class AttendanceService extends BaseService<Attendance> {
    constructor(session: any) {
        super(FND_EDU_URL || '', 'attendances', 'presença', session);
    }

    async findAllAttendancesByClassroomId(classroomId: string): Promise<ClassroomAttendances | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/classroom/${classroomId}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`Erro ao buscar presenças da sala de aula. ${error.detail}`);
                return null;
            }
        } catch (error) {
            toast.error(`Erro ao buscar presenças da sala de aula: ${error}`);
            return null;
        }
    }

    async createAttendancesForClassroom(dto: CreateAttendances): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/classroom/attendances`, {
                method: 'POST',
                headers: {
                    ...getBaseHeaders(this.session),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });

            if (response.ok) {
                toast.success('Chamada realizada com sucesso!');
            } else {
                const error = await response.json();
                toast.error(`Erro realizar a chamada. ${error.detail}`);
            }
        } catch (error) {
            toast.error(`Erro realizar a chamada: ${error}`);
        }
    }

    async findAllAttendancesByStudentRaAndClassroomId(studentRa: string, classroomId: string): Promise<StudentAttendances | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/student/${studentRa}/classroom/${classroomId}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`Erro ao buscar presenças do aluno. ${error.detail}`);
                return null;
            }
        } catch (error) {
            toast.error(`Erro ao buscar presenças do aluno: ${error}`);
            return null;
        }
    }

    async findAllAttendancesByStudentRaAndSemesterId(studentRa: string, semesterId: string): Promise<StudentAttendances | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/student/${studentRa}/semester/${semesterId}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`Erro ao buscar presenças do aluno. ${error.detail}`);
                return null;
            }
        } catch (error) {
            toast.error(`Erro ao buscar presenças do aluno: ${error}`);
            return null;
        }
    }
}
