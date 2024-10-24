"use client";
import { Request } from "@/app/core/entities/request/request";
import { requestSummaryColumns } from "@/app/core/entities/request/requestSummaryColumns";
import { RequestService } from "@/app/core/services/request.service";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { STUDENT_ROLE } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentRequestPage() {
    const { data: session }: any = useSession();
    const [request, setRequest] = useState<Request[]>([]);
    const [reloadRequest, setReloadRequest] = useState(true);
    const router = useRouter()

    const requestService = new RequestService(session);

    const fetchRequest = async (email: string) => {
        const response = await requestService.findAllByStudentEmail(email);
        setReloadRequest(false)
        if (!response) return;
        setRequest(response)
    };


    useEffect(() => {
        if (!session) return;

        if (session.user.role === STUDENT_ROLE && reloadRequest) {
            fetchRequest(session.user.email);
        }
    }, [session, reloadRequest]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <h1 className="font-semibold text-xl">Histórico de requerimentos</h1>
                <Button variant={"outline"} onClick={() => router.push("/main/requerimento/novo")}>Abrir requerimento</Button>
            </div>
            <DataTable columns={requestSummaryColumns()} data={request} loading={reloadRequest} />
        </div>
    )
}