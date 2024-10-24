"use client";

import { Request } from "@/app/core/entities/request/request";
import { requestColumns } from "@/app/core/entities/request/requestColumns";
import { RequestService } from "@/app/core/services/request.service";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createFilterSchema = () => {
    return z.object({
        protocolNumber: z.string().min(8, 'Insira um valor de 8 dígitos').max(8, 'Insira um valor de 8 dígitos').trim().or(z.literal(''))
    });
};

export default function RequestPage() {
    const { data: session }: any = useSession();
    const [requests, setRequests] = useState<Request[]>([]);
    const [reloadRequests, setReloadRequests] = useState(true);
    const router = useRouter()

    const formSchema = createFilterSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            protocolNumber: '',
        },
    });
    const requestService = new RequestService(session);

    const fetchRequests = async () => {
        let requests: Request[] = [];
        requests = await requestService.findAll();
        setRequests(requests);
        setReloadRequests(false)
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadRequests) {
            fetchRequests();
        }
    }, [session, reloadRequests]);


    
    const handleDeleteById = async (id: string) => {
        const response = await requestService.deleteById(id);
        if (response) {
            fetchRequests();
        }
    };


    return (
        <PageLayout title="Requerimentos">
            <div className="flex-col items-end sm:flex-row flex sm:justify-between p-6 gap-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => setReloadRequests(true))} className="w-full grid sm:grid-cols-2 gap-2 items-start">
                        <FormField
                            control={form.control}
                            name="protocolNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Pesquise pelo RA do aluno" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between gap-2 w-full">
                            <div className="flex gap-2">
                                <Button variant={"outline"} className="w-12" type="submit"><Search /></Button>
                            </div>
                            <Button variant={"outline"} className="w-12" onClick={() => router.push('requerimento/novo')}><PlusIcon /></Button>
                        </div>
                    </form>
                </Form>
            </div>
            <CardContent>
                <DataTable
                    columns={requestColumns({ hasDelete: true, deleteFn: handleDeleteById, hasEdit: true, editFn: (request: Request) => router.push(`requerimento/${request.id}`) })}
                    data={requests}
                    loading={reloadRequests}
                />
            </CardContent>
        </PageLayout>
    );
}
