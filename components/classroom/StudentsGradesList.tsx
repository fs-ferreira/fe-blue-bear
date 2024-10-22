"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Grade } from "@/app/core/entities/grade/grade";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { GradeService } from "@/app/core/services/grade.service";
import { DataTable } from "../shared/DataTable";
import { studentsGradesColumns } from "@/app/core/entities/grade/studentsGradesColumns";
import GradeDialog from "./GradeDialog";


interface DialogStateProps {
    isOpen: boolean;
    grade?: Grade;
}

export default function StudentsGradesList({ classroomId }: { classroomId?: string }) {
    const { data: session }: any = useSession();
    const [grades, setGrades] = useState<Grade[]>([]);
    const [dialogState, setDialogState] = useState<DialogStateProps>({ isOpen: false });
    const [reloadGrades, setReloadGrades] = useState(true);
    const router = useRouter()


    const gradeService = new GradeService(session);

    const fetchGrades = async () => {
        if (classroomId) {
            const grades = await gradeService.getAllGradesByClassroomId(classroomId);
            setReloadGrades(false)
            if (!grades) return;
            setGrades(grades);
        }
    };

    useEffect(() => {
        if (session && reloadGrades) {
            fetchGrades();
        }
    }, [session, reloadGrades]);


    const handleOpenDialog = (grade: Grade) => {
        setDialogState({ isOpen: true, grade });
    };

    const handleCloseDialog = (reload = false) => {
        setDialogState({ ...dialogState, isOpen: false });
        setReloadGrades(reload);
    };

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            <div>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                    <h1 className="font-semibold text-xl">Notas</h1>
                </div>
                <p className="font-normal text-muted-foreground">
                    Confira a lista de notas dos alunos matriculados na disciplina.
                </p>
            </div>
            <Separator />
            {dialogState.isOpen && (
                <GradeDialog isOpen={dialogState.isOpen} onClose={handleCloseDialog} grade={dialogState.grade} />
            )}
            <div>
                <DataTable columns={studentsGradesColumns({ hasEdit: true, editFn: (grade: Grade) => handleOpenDialog(grade) })} data={grades} />
            </div>

        </div>
    )
}
