"use client";
import { Student } from "@/app/core/entities/student/student";
import { studentColumns } from "@/app/core/entities/student/studentColumns";
import { StudentService } from "@/app/core/services/student.service";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";    
import { useEffect, useState } from "react";

export default function StudentsPage() {

    const { data: session }: any = useSession();
    const [students, setStudents] = useState<Student[]>([]);
    const [reloadStudents, setReloadStudents] = useState(true);
    const router = useRouter()


    const studentService = new StudentService(session);

    const fetchStudents = async () => {
        const students = await studentService.findAll();
        setStudents(students);
        setReloadStudents(false)
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadStudents) {
            fetchStudents();
        }
    }, [session, reloadStudents]);


    const handleDeleteById = async (id: string) => {
        const response = await studentService.deleteById(id);
        if (response) {
            fetchStudents();
        }
    };


    return (
        <PageLayout title="Painel de Alunos">
            <div className="flex justify-between p-6 gap-3">
                <Button variant={"outline"} className="font-semibold text-muted-foreground" onClick={() => router.push('users')}>Usuários</Button>
                <Button variant={"outline"} className="w-12" onClick={() => router.push('alunos/novo')}><PlusIcon /></Button>
            </div>
            <CardContent>
                <DataTable columns={studentColumns({ hasDelete: true, deleteFn: handleDeleteById, hasEdit: true, editFn: (student: Student) => router.push(`alunos/${student.ra}`) })}
                 data={students} loading={reloadStudents}/>
            </CardContent>
        </PageLayout>
    )
}