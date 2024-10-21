"use client"

import { ClassroomService } from "@/app/core/services/classroom.service"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DisciplineCombobox } from "../shared/DisciplineCombobox"
import { SemesterCombobox } from "../shared/SemesterCombobox"
import { UserCombobox } from "../shared/UserCombobox"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"

const createClassroomSchema = () => {
    return z.object({
        semesterId: z.string({ required_error: "Semestre obrigatório" }).trim(),
        disciplineId: z.string({ required_error: "Disciplina obrigatória" }).trim(),
        professorId: z.string({ required_error: "Professor obrigatório" }).trim(),
    });
};

interface ClassroomSheetProps {
    isOpen: boolean;
    onClose: (reloadClassrooms: boolean) => void;
}


export default function ClassroomSheet({ isOpen, onClose }: ClassroomSheetProps) {
    const { data: session } = useSession();
    const classroomService = new ClassroomService(session);
    const [loading, setLoading] = useState<boolean>(false)
    const formSchema = createClassroomSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            semesterId: '',
            disciplineId: '',
            professorId: ''
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        let result: any;

        result = await classroomService.createClassroom(values);
        setLoading(false)
        if (!result) {
            form.reset();
            return
        }
        onClose(true);
    }

    const disciplineId = form.watch('disciplineId');

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                    <SheetTitle>Salas de aula</SheetTitle>
                    <SheetDescription>
                        Crie uma nova sala de aula preenchendo os valores abaixo
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
                        <FormField
                            control={form.control}
                            name="disciplineId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Disciplina</FormLabel>
                                    <FormControl>
                                        <DisciplineCombobox onDisciplineSelect={(discipline) => field.onChange(discipline?.id)} disciplineId={field.value} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="semesterId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Semestre</FormLabel>
                                    <FormControl>
                                        <SemesterCombobox
                                            disabled={!disciplineId}
                                            disciplineId={disciplineId}
                                            onSemesterSelect={(semester) => field.onChange(semester?.id)}
                                            semesterId={field.value} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="professorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Professor</FormLabel>
                                    <FormControl>
                                        <UserCombobox onUserSelect={(user) => field.onChange(user?.id)} userId={field.value} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetFooter>
                            <Button type="submit" disabled={loading}>{loading ? <Loader className="animate-spin" /> : 'Salvar'}</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
