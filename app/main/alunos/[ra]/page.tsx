"use client"

import { Adress } from "@/app/core/entities/student/addressResponse";
import { CreateStudentPayload } from "@/app/core/entities/student/createStudent";
import { StudentService } from "@/app/core/services/student.service";
import { CourseCombobox } from "@/components/shared/CourseCombobox";
import { DatePicker } from "@/components/shared/DatePicker";
import { PageLayout } from "@/components/shared/PageLayout";
import { SemesterPeriodCombobox } from "@/components/shared/SemesterPeriodCombobox";
import { UserCombobox } from "@/components/shared/UserCombobox";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { withMask } from 'use-mask-input';
import { z } from "zod";

const createStudentSchema = () => {
    return z.object({
        ra: z.string().trim().optional(),
        userId: z.string({ required_error: "Por favor, selecione um usuário" }).trim(),
        courseId: z.string({ required_error: "Por favor, selecione um curso" }).trim(),
        rg: z.string().min(9, 'RG inválido').trim(),
        cpf: z.string().min(11, 'CPF inválido').trim(),
        cep: z.string().min(8, 'CEP inválido').trim(),
        dateOfBirth: z.date({ required_error: "Por favor, selecione uma data de nascimento" }),
        graduated: z.boolean(),
        tuitionDiscount: z.coerce.number().optional().refine(value => value === undefined || (value >= 0 && value <= 100), {
            message: "Desconto inválido, selecione um valor entre 0 a 100",
        }),
        street: z.string({ required_error: "Campo rua obrigatório" }).min(4, 'Rua deve conter, no mínimo 4 dígitos').trim(),
        houseNumber: z.coerce.number().optional(),
        complement: z.string().trim().optional(),
        neighborhood: z.string({ required_error: "Campo bairro obrigatório" }).min(4, 'Bairro deve conter, no mínimo 4 dígitos').trim(),
        city: z.string({ required_error: "Campo cidade obrigatório" }).min(4, 'Cidade deve conter, no mínimo 4 dígitos').trim(),
        state: z.string({ required_error: "Campo estado obrigatório" }).min(4, 'Estado deve conter, no mínimo 4 dígitos').trim(),
        phone: z.string({ required_error: "Campo telefone obrigatório" }).min(9, 'Telefone inválido').trim(),
        semesterSequenceId: z.string().trim().optional(),
    });
};



export default function StudentForm({ params }: { params: { ra: string } }) {
    const { data: session }: any = useSession();
    const router = useRouter();
    const formSchema = createStudentSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            graduated: false,
            rg: '',
            cpf: '',
            cep: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            complement: '',
            ra: '',
            phone: '',
            semesterSequenceId: ''
        },
    })
    const [loading, setLoading] = useState<boolean>(false)
    const studentService = new StudentService(session);
    const [reloadStudent, setReloadStudent] = useState(true);

    const fetchStudent = async () => {
        const student = await studentService.findById(params.ra);
        if (student) {
            Object.keys(student).forEach((key) => {

                switch (key) {
                    case 'dateOfBirth':
                        form.setValue('dateOfBirth', student[key]);
                        break;
                    case 'houseNumber':
                    case 'tuitionDiscount':
                        form.setValue(key as keyof typeof formSchema.shape, Number(student[key]) || undefined);
                        break;
                    case 'user':
                        form.setValue('userId', student[key].id);
                        break;
                    case 'course':
                        form.setValue('courseId', student[key].id);
                        break;
                    default:
                        form.setValue(key as keyof typeof formSchema.shape, student[key]);
                        break;
                }
            });
        }
        setReloadStudent(false);
    };

    const handleFecthAddress = async () => {
        setLoading(true);
        const cep = form.getValues('cep').replaceAll(/[^0-9]/g, "");
        if (!cep || cep.length !== 8) {
            return;
        }
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: 'GET',
            });

            const responseBody = await response.json();

            if (responseBody.erro) {
                toast.info(`CEP não encontrado!`);
                return;
            }
            fillAddresData(responseBody)
        } catch (error) {
            toast.error(`Erro ao buscar CEP: ${error}`);
            return [];
        } finally {
            setLoading(false);
        }
    };

    function fillAddresData(address: Adress) {
        form.setValue("state", address.estado)
        form.setValue("city", address.localidade)
        form.setValue("neighborhood", address.bairro)
        form.setValue("street", address.logradouro)
        form.setValue("complement", address.complemento)
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        let result;
        const body: CreateStudentPayload = {
            ...values,
            cep: values.cep.replaceAll(/[^0-9]/g, ""),
            rg: values.rg.replaceAll(/[^0-9]/g, ""),
            cpf: values.cpf.replaceAll(/[^0-9]/g, ""),
            phone: values.phone.replaceAll(/[^0-9]/g, "")
        }

        if (values.ra) {
            result = await studentService.updateStudent(body);
        } else {
            result = await studentService.saveStudent(body);
        }
        setLoading(false);
        result && router.back()
    }

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadStudent) {
            if (params.ra !== 'novo') {
                fetchStudent()
                return;
            }
        }
    }, [session, reloadStudent]);


    return (
        <PageLayout title="Aluno">
            <CardContent className="pt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                        <div className="flex flex-col gap-3">
                            <h2 className="text-sm font-medium">Vincular usuário</h2>
                            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="userId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Usuário</FormLabel>
                                            <FormControl>
                                                <UserCombobox onUserSelect={(user) => field.onChange(user?.id)} userId={field.value} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ra"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>RA do aluno</FormLabel>
                                            <FormControl>
                                                <Input disabled placeholder="Gerado automaticamente" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator className="my-1" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-sm font-medium">Dados pessoais</h2>
                            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="rg"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>RG</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira os dados do RG" {...field} ref={withMask('99.999.999-9')} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>CPF</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira os dados do CPF" {...field} ref={withMask('999.999.999-99')} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Telefone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira o número de telefone" {...field} ref={withMask('(99) [9]9999-9999')} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dateOfBirth"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Data de nascimento</FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    onDateSelect={field.onChange}
                                                    value={field.value ? new Date(field.value) : undefined}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cep"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CEP</FormLabel>
                                            <FormControl>
                                                <div className="flex gap-2">
                                                    <Input disabled={loading} placeholder="Digite o CEP..." {...field} ref={withMask('99999-999')} />
                                                    <Button disabled={loading} variant={"outline"} type="button" onClick={handleFecthAddress}>
                                                        {loading ? <Loader className="size-4 animate-spin" /> : <Search className="size-4" />}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estado</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira o estado" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Cidade</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira a cidade" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="neighborhood"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Bairro</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira o bairro" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Rua</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira a rua" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="houseNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Insira o número" step={1} {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="complement"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormLabel>Complemento</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira o complemento" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator className="my-1" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-sm font-medium">Seleção de curso</h2>
                            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="courseId"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Curso</FormLabel>
                                            <FormControl>
                                                <CourseCombobox onCourseSelect={(course) => field.onChange(course?.id)} courseId={field.value} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="semesterSequenceId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Período de iniciação</FormLabel>
                                            <FormControl>
                                                <SemesterPeriodCombobox onSemesterSelect={(semester) => field.onChange(semester?.semesterSequenceId)} semesterId={field.value} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tuitionDiscount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Desconto na mensalidade (%)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Insira o desconto em %" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-full pt-3" >
                            <Button type="button" variant={"outline"} onClick={router.back}>Voltar</Button>
                            <Button type="submit" disabled={loading}>Salvar</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </PageLayout>
    )
}