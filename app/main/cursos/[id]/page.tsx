"use client";

import { Course } from "@/app/core/entities/course/course";
import { Discipline } from "@/app/core/entities/discipline/discipline";
import { CourseType, courseTypeDisplayNames } from "@/app/core/enums/courseType.enum";
import { CourseService } from "@/app/core/services/course.service";
import { DisciplineService } from "@/app/core/services/discipline.service";
import { PageLayout } from "@/components/shared/PageLayout";
import SubmitButton from "@/components/shared/SubmitButton";
import TransferList, { Item, TransferListDataState } from "@/components/shared/TransferList";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


function formatToFloat(value: string): number {
    const numericValue = value.replace(/\D/g, "");
    return parseFloat(numericValue) / 100;

}

const createCourseSchema = () => {
    return z.object({
        courseName: z.string().min(4, 'Curso deve ter, no mínimo, 4 caracteres').trim(),
        courseType: z.nativeEnum(CourseType, { required_error: "Tipo de curso obrigatório" }),
        description: z.string().trim().optional(),
        numberOfSemesters: z.coerce.number().min(2, 'Um curso deve ter no mínimo 2 semestres').max(12, 'Um curso deve ter no máximo 12 semestres'),
        monthlyFee: z.string().min(4, 'Valor inválido').trim().refine((val) => !isNaN(Number(formatToFloat(val))), {
            message: "Valor de mensalidade inválido",
        }),
    });
};

export default function CoursePage({ params }: { params: { id: string } }) {
    const { data: session }: any = useSession();
    const formSchema = createCourseSchema();
    const router = useRouter();

    const [keyValueDisciplines, setKeyValueDisciplines] = useState<{ leftList: Item[], rightList: Item[] }>({ leftList: [], rightList: [] });
    const [existingDisciplines, setExistingDisciplines] = useState<Discipline[]>([])
    const [disciplinesToAdd, setDisciplinesToAdd] = useState<string[]>([])
    const [reloadDisciplines, setReloadDisciplines] = useState(true);
    const [loading, setLoading] = useState(false);

    const courseService = new CourseService(session);
    const disciplineService = new DisciplineService(session)

    const fetchDisciplines = async () => {
        const disciplines = await disciplineService.findAll();
        mountDisciplinesHashMap(disciplines);
        setReloadDisciplines(false);
    };

    const fetchCourse = async () => {
        setLoading(true)
        const course = await courseService.findById(params.id);
        setLoading(false)
        if (course) {
            fillForm(course)
            if (!course.disciplines.length) {
                fetchDisciplines();
                return;
            }
            setDisciplinesToAdd(course.disciplines.map((el) => el.id));
            setExistingDisciplines(course.disciplines);
        }
    };

    function fillForm(course: Course): void {
        form.setValue("courseName", course.courseName);
        form.setValue("courseType", course.courseType);
        form.setValue("description", course.description);
        form.setValue("numberOfSemesters", course.numberOfSemesters);
        form.setValue("monthlyFee", course.monthlyFee.toFixed(2));
    }

    const mountDisciplinesHashMap = (disciplines: Discipline[]) => {
        const leftList: Item[] = [];
        const rightList: Item[] = [];

        disciplines.forEach(discipline => {
            const isExisting = existingDisciplines.some(existing => existing.id === discipline.id);
            const item: Item = {
                key: discipline.id,
                label: discipline.name,
            };

            if (isExisting) {
                rightList.push(item);
            } else {
                leftList.push(item);
            }
        });

        setKeyValueDisciplines({ leftList, rightList });
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadDisciplines) {
            if (params.id !== 'novo') {
                fetchCourse()
                return;
            }
            fetchDisciplines();
        }
    }, [session, reloadDisciplines]);

    useEffect(() => {
        if (existingDisciplines.length > 0) {
            fetchDisciplines();
        }
    }, [existingDisciplines]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseName: "",
            monthlyFee: ""
        },
    })

    function formatCurrency(value: string) {
        const floatValue = formatToFloat(value);
        if (isNaN(floatValue)) {
            return '';
        }
        return floatValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    }


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const course: Course = {
                ...values,
                courseType: values.courseType.toUpperCase(),
                monthlyFee: formatToFloat(values.monthlyFee),
            } as Course;

            let res;

            if (params.id !== 'novo') {
                course.id = params.id
                res = await courseService.update(course);
            } else {
                res = await courseService.save(course);
            }

            if (res && disciplinesToAdd.length > 0) {
                const result = await courseService.addDisciplinesToCourse({
                    courseId: res.id,
                    disciplineIds: disciplinesToAdd,
                });

                if (!result) {
                    throw new Error("Falha ao adicionar disciplinas ao curso.");
                }
            }

            router.back();
        } catch (error) {
            console.error("Erro ao salvar curso ou adicionar disciplinas:", error);
            form.reset();
        } finally {
            setLoading(false)
        }
    }


    const handleListChange = (data: TransferListDataState) => {
        setDisciplinesToAdd(data.rightList.map((el) => el.key));
    };

    return (
        <PageLayout title="Painel do Curso">
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="md:grid md:grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="courseName"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>Nome do Curso</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Engenharia de Computação" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="courseType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Modalidade</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma modalidade" className="placeholder:text-muted" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.values(CourseType).map((key) => <SelectItem key={key} value={key}>{courseTypeDisplayNames[key]}</SelectItem>)
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="col-span-4">
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Descrição do curso"
                                                rows={10}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="numberOfSemesters"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Nº de semestres</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Insira a quantidade de semestres" type="number" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="monthlyFee"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Valor de Mensalidade (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="0,00"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const formattedValue = formatCurrency(e.target.value);
                                                    field.onChange(formattedValue); // Atualiza o valor no form
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <TransferList
                            onListChange={handleListChange}
                            leftItems={keyValueDisciplines.leftList}
                            rightItems={keyValueDisciplines.rightList}
                            leftTitle="Disponíveis"
                            rightTitle="Atribuídas"
                        />
                        <div className="flex justify-between w-full" >
                            <Button type="button" variant={"outline"} onClick={router.back}>Voltar</Button>
                            <SubmitButton loading={loading} />
                        </div>
                    </form>
                </Form>

            </CardContent>
        </PageLayout>
    )
}