"use client"

import { Classroom } from "@/app/core/entities/classroom/classroom";
import { ClassroomService } from "@/app/core/services/classroom.service";
import ActivityTab from "@/components/classroom/ActivityTab";
import ContentTab from "@/components/classroom/ContentTab";
import StudentsList from "@/components/classroom/StudentsList";
import { PageLayout } from "@/components/shared/PageLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
        console.warn(classroom);

        setClassroom(classroom);
    };

    useEffect(() => {
        if (session && reloadClassroom) {
            fetchClassroom();
        }
    }, [session, reloadClassroom]);

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
                    <StudentsList students={classroom?.students || []} />
                </TabsContent>
                <TabsContent value="atividades">
                    <ActivityTab />
                </TabsContent>
            </Tabs>
        </PageLayout>
    )
}