import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { GradeDisciplineStatus, gradeStatusDisplayNames } from "@/app/core/enums/gradeDisciplineStatus.enum";
import { useSession } from "next-auth/react";
import { Student } from "@/app/core/entities/student/student";
import { StudentSummary } from "@/app/core/entities/student/studentSummary";
import { GradeService } from "@/app/core/services/grade.service";
import { Grade } from "@/app/core/entities/grade/grade";

const activitiesMock = [
    { id: 1, name: "Atividade 1", score: 8.5 },
    { id: 2, name: "Atividade 2", score: 7.0 },
    { id: 3, name: "Trabalho de Grupo", score: 9.0 },
    { id: 4, name: "Prova 1", score: 6.5 },
    { id: 5, name: "Atividade 3", score: 10.0 },
];

export default function StudentGradeTab({ student, classroomId }: { student?: Student | StudentSummary, classroomId?: string }) {

    const { data: session }: any = useSession();
    const [grade, setGrade] = useState<Grade>();
    const [reloadGrade, setReloadGrade] = useState(true);

    const gradeService = new GradeService(session);

    const fetchGrade = async () => {
        if (student && classroomId) {
            const grade = await gradeService.findGradeByStudentRaAndClassroomId(student.ra, classroomId);
            setReloadGrade(false)
            if (!grade) return;
            setGrade(grade);
        }
    };

    useEffect(() => {
        if (session && reloadGrade) {
            fetchGrade();
        }
    }, [session, reloadGrade]);

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            <div>
                <h1 className="font-semibold text-xl">Suas Notas</h1>
                <p className="font-normal text-muted-foreground">
                    Confira o registro das suas notas de atividades, trabalhos e provas.
                </p>
            </div>
            <p className="font-bold text-muted-foreground">
                Obs: Sua nota geral só fica disponível quando o professor responsável computa-a no sistema.
            </p>
            <Separator />

            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <p className="text-muted-foreground">Nota Geral:</p>
                    <p className="font-bold">{grade?.gradeValue === 0? '-' :grade?.gradeValue.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-muted-foreground">Status da disciplina:</p>
                    <p className="font-bold">{gradeStatusDisplayNames[grade?.status as GradeDisciplineStatus]}</p>
                </div>
            </div>

            <div className="space-y-3">
                <h2 className="font-semibold text-lg">Notas por Atividade:</h2>
                <ul className="flex flex-col gap-2">
                    {activitiesMock.map(activity => (
                        <li key={activity.id} className="flex justify-between items-center">
                            <p className="sm:w-[150px] text-end text-nowrap overflow-hidden overflow-ellipsis text-muted-foreground">{activity.name}</p>
                            <div className="flex-grow border-b border-gray-300 mx-2" />
                            <p className="font-bold">{activity.score.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
