"use client"

import { SemesterService } from "@/app/core/services/semester.service"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DatePicker } from "../shared/DatePicker"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import { SemesterYearPeriod, semesterYearPeriodDisplayNames } from "@/app/core/enums/semesterYearPeriod.enum"
import { CourseCombobox } from "../shared/CourseCombobox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import SubmitButton from "../shared/SubmitButton"

const createSemesterSchema = () => {
    return z.object({
        courseId: z.string({ required_error: "Curso obrigatório" }).trim(),
        year: z.coerce.number({ required_error: "Ano obrigatório" }).min(new Date().getFullYear(), 'Não é possível criar ciclos retroativos'),
        period: z.nativeEnum(SemesterYearPeriod, { required_error: "Período obrigatório" })
    });
};

interface SemesterSheetProps {
    isOpen: boolean;
    onClose: (reloadSemesters: boolean) => void;
}


export default function SemesterSheet({ isOpen, onClose }: SemesterSheetProps) {
    const { data: session } = useSession();
    const semesterService = new SemesterService(session);
    const [loading, setLoading] = useState<boolean>(false)
    const formSchema = createSemesterSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseId: '',
            year: new Date().getFullYear(),
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        let result: any;

        result = await semesterService.createNewSemesterCycle(values);
        setLoading(false)
        if (!result) {
            form.reset();
            return
        }
        onClose(true);
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                    <SheetTitle>Ciclo do curso</SheetTitle>
                    <SheetDescription>
                        Inicie um novo ciclo de semestre para o curso selecionado
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
                        <FormField
                            control={form.control}
                            name="courseId"
                            render={({ field }) => (
                                <FormItem>
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
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ano</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Insira o ano do ciclo" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="period"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Período</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um o período de iniciação" className="placeholder:text-muted" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    Object.values(SemesterYearPeriod).map((key) => <SelectItem key={key} value={key}>{semesterYearPeriodDisplayNames[key]}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <SheetFooter>
                        <SubmitButton loading={loading} />
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
