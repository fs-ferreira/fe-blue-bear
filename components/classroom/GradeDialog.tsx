"use client"

import { Grade } from "@/app/core/entities/grade/grade"
import { GradeDisciplineStatus, gradeStatusDisplayNames } from "@/app/core/enums/gradeDisciplineStatus.enum"
import { GradeService } from "@/app/core/services/grade.service"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
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
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "sonner"

const createGradeSchema = () => {
    return z.object({
        id: z.string({ required_error: "Nota inválida" }).trim(),
        gradeValue: z.coerce.number().min(0, "Nota inválida").max(10, "Nota inválida"),
        status: z.nativeEnum(GradeDisciplineStatus, { required_error: "Status obrigatório" }),
    });
};

interface GradeDialogProps {
    isOpen: boolean;
    onClose: (reloadGrades: boolean) => void;
    grade?: Grade;
}


export default function GradeDialog({ isOpen, onClose, grade }: GradeDialogProps) {
    const { data: session } = useSession();
    const gradeService = new GradeService(session);

    function fillForm(): void {
        if (grade) {
            form.setValue("id", grade.id)
            form.setValue("gradeValue", grade.gradeValue)
            form.setValue("status", grade.status)
        }
    }

    useEffect(() => {
        if (grade) {
            fillForm();
        }
    }, [grade]);

    const formSchema = createGradeSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            gradeValue: undefined,
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await gradeService.updateGrade(values.id, { gradeValue: values.gradeValue, status: values.status });
        if (!result) {
            return
        }
        toast.success('Nota alterada com sucesso!');
        onClose(true);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Nota</DialogTitle>
                        <DialogDescription>
                            Altere a nota e o status da disciplina do Aluno
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="gradeValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Carga horária</FormLabel>
                                    <FormControl>
                                        <Input placeholder="40 horas" type="number" step={0.25} {...field} value={field.value || ""} />
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
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um assunto" className="placeholder:text-muted" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    Object.values(GradeDisciplineStatus).map((key) => <SelectItem key={key} value={key}>{gradeStatusDisplayNames[key]}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
