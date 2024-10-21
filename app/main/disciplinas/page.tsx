"use client";

import { Discipline } from "@/app/core/entities/discipline/discipline";
import { disciplineColumns } from "@/app/core/entities/discipline/disciplineColumns";
import { DisciplineService } from "@/app/core/services/discipline.service";
import DisciplineDialog from "@/components/disciplines/DisciplineDialog";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DialogStateProps {
    isOpen: boolean;
    discipline: Discipline | null;
}

export default function DisciplinesPage() {
    const { data: session }: any = useSession();
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [dialogState, setDialogState] = useState<DialogStateProps>({ isOpen: false, discipline: null });
    const [reloadDisciplines, setReloadDisciplines] = useState(true);
    const router = useRouter()


    const disciplineService = new DisciplineService(session);

    const fetchDisciplines = async () => {
        const disciplines = await disciplineService.findAll();
        setDisciplines(disciplines);
        setReloadDisciplines(false)
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadDisciplines) {
            fetchDisciplines();
        }
    }, [session, reloadDisciplines]);


    const handleOpenDialog = (discipline?: Discipline) => {
        setDialogState({ isOpen: true, discipline: discipline || null });
    };

    const handleCloseDialog = (reload = false) => {
        setDialogState({ ...dialogState, isOpen: false });
        setReloadDisciplines(reload);
    };

    const handleDeleteById = async (id: string) => {
        const response = await disciplineService.deleteById(id);
        if (response) {
            fetchDisciplines();
        }
    };

    return (
        <PageLayout title="Disciplinas">
            {dialogState.isOpen && (
                <DisciplineDialog isOpen={dialogState.isOpen} onClose={handleCloseDialog} discipline={dialogState.discipline} />
            )}
            <div className="flex justify-between p-6 gap-3">
                <Button variant={"outline"} className="font-semibold text-muted-foreground" onClick={() => router.push('cursos')}>Cursos</Button>
                <Button variant={"outline"} className="w-12" onClick={() => handleOpenDialog()}><PlusIcon /></Button>
            </div>
            <CardContent>
                <DataTable columns={disciplineColumns({ hasDelete: true, deleteFn: handleDeleteById, hasEdit: true, editFn: (discipline: Discipline) => handleOpenDialog(discipline) })} data={disciplines} />
            </CardContent>
        </PageLayout>
    )

}