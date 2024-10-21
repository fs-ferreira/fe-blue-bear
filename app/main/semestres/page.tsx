"use client";

import { CourseSemesterInfo } from "@/app/core/entities/semester/courseSemesterInfo";
import { periodColumns } from "@/app/core/entities/semester/periodColumns";
import { SemesterService } from "@/app/core/services/semester.service";
import SemesterSheet from "@/components/semester/SemesterSheet";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SemestersPage() {

    const { data: session }: any = useSession();
    const [semesters, setSemesters] = useState<CourseSemesterInfo[]>([]);
    const [reloadSemesters, setReloadSemesters] = useState(true);
    const router = useRouter();
    const [dialogState, setDialogState] = useState<{ isOpen: boolean }>({ isOpen: false });

    const semesterService = new SemesterService(session);

    const fetchSemesters = async () => {
        const semesters = await semesterService.findAllUniqueSequentialKeys();
        setSemesters(semesters);
        setReloadSemesters(false);
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadSemesters) {
            fetchSemesters();
        }
    }, [session, reloadSemesters]);

    const handleDeleteById = async (id: string) => {
        const response = await semesterService.deleteById(id);
        if (response) {
            fetchSemesters();
        }
    }

    const handleOpenDialog = () => {
        setDialogState({ isOpen: true });
    };

    const handleCloseDialog = (reload = false) => {
        setDialogState({ ...dialogState, isOpen: false });
        setReloadSemesters(reload);
    };

    return (
        <PageLayout title="Gestão de ciclos">
            {dialogState.isOpen && (
                <SemesterSheet isOpen={dialogState.isOpen} onClose={handleCloseDialog} />
            )}
            <div className="flex justify-end p-6 gap-3">
                <Button variant={"outline"} className="w-12" onClick={handleOpenDialog}><PlusIcon /></Button>
            </div>
            <CardContent>
                <DataTable columns={periodColumns({ deleteFn: handleDeleteById })} data={semesters} />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"outline"} onClick={() => router.push('/main')}>Voltar</Button>
            </CardFooter>
        </PageLayout>
    )
}