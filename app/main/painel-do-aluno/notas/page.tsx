"use client";
import { Grade } from "@/app/core/entities/grade/grade";
import { gradeColumns } from "@/app/core/entities/grade/gradeColumns";
import { GradeService } from "@/app/core/services/grade.service";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { STUDENT_ROLE } from "@/lib/utils";
import { FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StudentGradesPage() {
    const { data: session }: any = useSession();
    const [grades, setGrades] = useState<Grade[]>([]);
    const [reloadGrade, setReloadGrade] = useState(true);
    const [gradeAverage, setGradeAverage] = useState<string>()

    const gradeService = new GradeService(session);

    const fetchGrades = async (email: string) => {
        const response = await gradeService.getAllGradesByStudentEmail(email);
        setReloadGrade(false)
        if (!response) return;
        setGrades(response)
        setStudentGradeAverage(response)
    };

    const setStudentGradeAverage = (grades: Grade[]) => {
        const gradesWithValue = grades.filter(el => !!el.gradeValue).map(el => el.gradeValue)
        if (!gradesWithValue.length) {
            setGradeAverage('N/A')
            return;
        }
        const average = gradesWithValue.reduce((acc, curr) => acc + curr, 0) / gradesWithValue.length;
        setGradeAverage(average.toFixed(2));
    }


    useEffect(() => {
        if (!session) return;

        if (session.user.role === STUDENT_ROLE && reloadGrade) {
            fetchGrades(session.user.email);
        }
    }, [session, reloadGrade]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl">Boletim de notas</h1>
                <Button variant={"outline"}><FileText /></Button>
            </div>
            <div className="text-muted-foreground font-medium">Média geral: <span className="font-bold">{gradeAverage}</span></div>
            <DataTable columns={gradeColumns()} data={grades} />
        </div>
    )
}