"use client";

import { RequestPayload } from "@/app/core/entities/request/createRequest";
import { Request } from "@/app/core/entities/request/request";
import { Student } from "@/app/core/entities/student/student";
import { RequestStatus, requestStatusDisplayNames } from "@/app/core/enums/requestStatus.enum";
import { RequestType, requestTypeDisplayNames } from "@/app/core/enums/requestType.enum";
import { RequestService } from "@/app/core/services/request.service";
import { StudentService } from "@/app/core/services/student.service";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { STUDENT_ROLE } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";



const createRequestSchema = () => {
    return z.object({
        id: z.string().trim().optional(),
        studentRa: z.string().min(8, 'RA deve conter 8 dígitos').max(8, 'RA deve conter 8 dígitos').trim(),
        email: z.string().trim().optional(),
        fullName: z.string().trim().optional(),
        phone: z.string().trim().optional(),
        requestType: z.nativeEnum(RequestType, { required_error: "Tipo de requerimento obrigatório" }),
        description: z.string().trim().optional(),
        status: z.nativeEnum(RequestStatus, { required_error: "Status do requerimento obrigatório" }),
        title: z.string().min(10, 'Título deve ter, no mínimo, 10 caracteres').trim(),
        protocolNumber: z.string().trim().optional(),

    });
};

export default function RequestForm({ params }: { params: { id: string } }) {
    const { data: session }: any = useSession();
    const [isNotAdmin, setIsNotAdmin] = useState<boolean>(false);
    const [reloadRequest, setReloadRequest] = useState<boolean>(true);
    const formSchema = createRequestSchema();
    const router = useRouter();

    const requestService = new RequestService(session);
    const studentService = new StudentService(session);

    const fetchRequest = async () => {
        const request = await requestService.findById(params.id);
        if (request) {
            fillForm(request)
        }
    };

    const handleFetchStudent = async () => {
        const ra = form.getValues('studentRa');
        const raIsValid = /^[0-9]{8}$/.test(ra);

        if (!raIsValid) {
            toast.warning('RA inválido. O RA deve conter exatamente 8 dígitos.');
            return;
        }

        const student = await studentService.findByUserEmail(ra);
        if (student) {
            toast.success("Carregando dados do aluno...");
            fillUserSection(student);
        } else {
            resetUserSection();
        }
    };

    const fetchStudentByEmail = async () => {
        const student = await studentService.findByUserEmail(session.user.email);
        setReloadRequest(false);
        if (student) {
            toast.success("Carregando dados do aluno...");
            fillUserSection(student);
        } else {
            resetUserSection();
        }
    };

    function resetUserSection() {
        form.resetField("email");
        form.resetField("fullName");
        form.resetField("phone");
    }

    function fillUserSection(student: Student): void {
        form.setValue('studentRa', student.ra);
        form.setValue('email', student.user.email);
        form.setValue('fullName', student.user.fullName);
        form.setValue('phone', student.phone);
    }


    function fillForm(request: Request): void {
        Object.keys(request).forEach((key) => {
            switch (key) {
                case 'description':
                case 'title':
                case 'id':
                case 'protocolNumber':
                case 'requestType':
                case 'status':
                    form.setValue(key as keyof typeof formSchema.shape, request[key]);
                    break;
                case 'student':
                    form.setValue('studentRa', request[key].ra);
                    form.setValue('email', request[key].user.email);
                    form.setValue('fullName', request[key].user.fullName);
                    form.setValue('phone', request[key].phone);
                    break;
                default:
                    break;
            }
        });
    }


    useEffect(() => {
        if (session) {
            setIsNotAdmin(session.user.role !== 'admin')
            if (session?.user?.role === STUDENT_ROLE && reloadRequest) {
                fetchStudentByEmail()
            }
            if (params.id !== 'novo') {
                fetchRequest()
                return;
            }
        }
    }, [session, reloadRequest]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentRa: '',
            description: '',
            title: '',
            protocolNumber: '',
            email: '',
            fullName: '',
            phone: '',
            status: RequestStatus.OPEN
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const payload: RequestPayload = {
            requestType: values.requestType,
            status: values.status,
            studentRa: values.studentRa,
            title: values.title,
            description: values.description,
            protocolNumber: values.protocolNumber
        }

        let response;
        if (params.id !== 'novo') {
            payload.id = params.id;
            response = await requestService.updateRequest(payload);
        } else {
            response = await requestService.saveRequest(payload);
        }

        response && router.back();
    }


    return (
        <PageLayout title="Formulário para requerimentos">
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                        <div className="flex flex-col gap-3">
                            <h2 className="text-sm font-medium">Dados do solicitante</h2>
                            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="studentRa"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>RA do aluno</FormLabel>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input disabled={isNotAdmin} placeholder="Insira o RA" {...field} />
                                                </FormControl>
                                                {!isNotAdmin && <Button variant={"outline"} type="button" onClick={handleFetchStudent}><Search className="size-5" /></Button>}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input readOnly placeholder="Nome completo do aluno" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input readOnly placeholder="Email para contato" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefone</FormLabel>
                                            <FormControl>
                                                <Input readOnly placeholder="Telefone para contato" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator className="my-1" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-sm font-medium">Informações Gerais</h2>
                            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="protocolNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nº de Protocolo</FormLabel>
                                            <FormControl>
                                                <Input disabled placeholder="Gerado automaticamente" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="requestType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Assunto</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value} defaultValue="" disabled={!!form.getValues('protocolNumber')}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione um assunto" className="placeholder:text-muted" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            Object.values(RequestType).map((key) => <SelectItem key={key} value={key}>{requestTypeDisplayNames[key]}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Select disabled={isNotAdmin} onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione um assunto" className="placeholder:text-muted" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            Object.values(RequestStatus).map((key) => <SelectItem key={key} value={key}>{requestStatusDisplayNames[key]}</SelectItem>)
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormLabel>Título</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Título da solicitação" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descreva sobre o motivo da sua solicitação..."
                                                    rows={10}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                        </div>
                        <div className="flex justify-between w-full" >
                            <Button type="button" variant={"outline"} onClick={router.back}>Voltar</Button>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </PageLayout>
    )
}