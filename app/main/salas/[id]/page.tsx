"use client"

import { Classroom } from "@/app/core/entities/classroom/classroom";
import { ClassroomService } from "@/app/core/services/classroom.service";
import ActivityTab from "@/components/classroom/ActivityTab";
import ContentTab from "@/components/classroom/ContentTab";
import StudentGradeTab from "@/components/classroom/StudentGradeTab";
import StudentsGradesList from "@/components/classroom/StudentsGradesList";
import StudentsList from "@/components/classroom/StudentsList";
import { PageLayout } from "@/components/shared/PageLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { STUDENT_ROLE } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClassroomPage({ params }: { params: { id: string } }) {

    const { data: session }: any = useSession();
    const [classroom, setClassroom] = useState<Classroom>();
    const [reloadClassroom, setReloadClassroom] = useState(true);
    const router = useRouter()

    const classroomService = new ClassroomService(session);

    const fetchClassroom = async () => {
        const classroom = await classroomService.findById(params.id);
        setReloadClassroom(false)
        if (!classroom) return;
        setClassroom(classroom);
    };

    useEffect(() => {
        if (session && reloadClassroom) {
            fetchClassroom();
        }
    }, [session, reloadClassroom]);

    function getStudent() {
        return classroom?.students.find(el => el.user.email = session.user.email)
    }

    return (
        <PageLayout title={classroom?.discipline.name || 'Carregando...'}>
            <Tabs defaultValue="conteudo">
                <TabsList className="rounded-b-none h-16">
                    <div className="h-full w-full overflow-x-auto flex">
                        <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                        <TabsTrigger value="alunos">Alunos</TabsTrigger>
                        <TabsTrigger value="atividades">Atividades</TabsTrigger>
                        <TabsTrigger value="notas">Notas</TabsTrigger>
                    </div>
                </TabsList>
                <TabsContent value="conteudo">
                    <ContentTab />
                </TabsContent>
                <TabsContent value="alunos">
                    <StudentsList students={classroom?.students || []} classroom={classroom as Classroom}/>
                </TabsContent>
                <TabsContent value="atividades">
                    <ActivityTab />
                </TabsContent>
                <TabsContent value="notas">
                    {session.user.role === STUDENT_ROLE
                        ? <StudentGradeTab student={getStudent()} classroomId={classroom?.id} />
                        : <StudentsGradesList classroomId={classroom?.id} />}
                </TabsContent>

            </Tabs>
        </PageLayout>
    )
}