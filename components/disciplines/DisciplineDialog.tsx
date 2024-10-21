"use client"

import { Discipline } from "@/app/core/entities/discipline/discipline"
import { DisciplineService } from "@/app/core/services/discipline.service"
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

const createDisciplineSchema = () => {
    return z.object({
        name: z.string().min(6, "Nome precisa conter, no mínimo, 6 caracteres!").max(50).trim(),
        creditHours: z.coerce.number().min(10, "Carga horária precisa conter, no mínimo, 10h!").max(100).step(5),
    });
};

interface DisciplineDialogProps {
    isOpen: boolean;
    onClose: (reloadDisciplines: boolean) => void;
    discipline?: Discipline | null;
}


export default function DisciplineDialog({ isOpen, onClose, discipline }: DisciplineDialogProps) {
    const { data: session } = useSession();
    const disciplineService = new DisciplineService(session);

    function fillForm(): void {
        if (discipline) {
            form.setValue("name", discipline.name)
            form.setValue("creditHours", discipline.creditHours)
        }
    }

    useEffect(() => {
        if (discipline) {
            fillForm();
        }
    }, [discipline]);

    const formSchema = createDisciplineSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            creditHours: undefined
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let result: any;
        if (discipline) {
            result = await disciplineService.update({ ...discipline, creditHours: values.creditHours });
        } else {
            result = await disciplineService.save(values as Discipline);
        }
        if (!result) {
            form.reset();
            fillForm()
            return
        }
        onClose(true);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Disciplina</DialogTitle>
                        <DialogDescription>
                            Crie ou altere uma disciplina.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da disciplina</FormLabel>
                                    <FormControl>
                                        <Input disabled={!!discipline} placeholder="Programação I" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="creditHours"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Carga horária</FormLabel>
                                    <FormControl>
                                        <Input placeholder="40 horas"  type="number" step={5} {...field} value={field.value || ""}  />
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
