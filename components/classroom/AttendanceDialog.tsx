"use client"

import { AttendanceService } from "@/app/core/services/attendance.service"
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
import { Classroom } from "@/app/core/entities/classroom/classroom"
import { DatePicker } from "../shared/DatePicker"
import { ClassroomSummary } from "@/app/core/entities/classroom/classroomSumary"
import { Checkbox } from "../ui/checkbox"
import { KeyValueStudentAttendance } from "@/app/core/entities/attendance/createAttendances"

const createAttendanceSchema = () => {
    return z.object({
        id: z.string({ required_error: "Nota inválida" }).trim(),
        date: z.date({ required_error: "Data obriga´toria" }),
        attendances: z.array(
            z.object({
                studentRa: z.string(),
                present: z.boolean(),
            })
        ),
    });
};

interface AttendanceDialogProps {
    isOpen: boolean;
    classroom: Classroom;
    onClose: () => void;
}


export default function AttendanceDialog({ isOpen, onClose, classroom }: AttendanceDialogProps) {
    const { data: session } = useSession();
    const attendanceService = new AttendanceService(session);

    const formSchema = createAttendanceSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: classroom.id,
            date: new Date(),
            attendances: classroom?.students
                .map((student) => ({
                    studentRa: student.ra,
                    present: true,
                })),
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const studentAttendances = values.attendances.reduce((acc, attendance) => {
            acc[attendance.studentRa] = attendance.present;
            return acc;
        }, {} as KeyValueStudentAttendance);

        const response = attendanceService.createAttendancesForClassroom({
            classroomId: values.id,
            attendanceDate: values.date,
            studentAttendances
        })

        if (!response) return;

        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="h-[90dvh]  sm:max-w-[600px] flex flex-col">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Chamada</DialogTitle>
                        <DialogDescription>
                            Realize a chamada para o dia escolhido.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col overflow-auto">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Data da chamada</FormLabel>
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
                            name="attendances"
                            render={() => (
                                <FormItem className="col-span-2 flex-1 overflow-auto">
                                    <FormLabel className="flex justify-between">
                                        <p>Alunos</p>
                                        <p>Presente?</p>
                                    </FormLabel>
                                    <FormControl>
                                        <ul className="space-y-2 list-disc list-inside">
                                            {form.watch("attendances")?.map((attendance, index) => (
                                                <li key={index} className="flex items-center justify-between">
                                                    <p className="text-[14px] font-medium">{classroom?.students[index]?.user.fullName}</p>
                                                    <div className="flex-grow border-b border-gray-300 mx-2" />
                                                    <div className="flex w-[65px] items-center justify-center">
                                                        <Checkbox
                                                            className="size-6"
                                                            checked={attendance.present}
                                                            onCheckedChange={(e) =>
                                                                form.setValue(`attendances.${index}.present`, e as boolean)
                                                            }
                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
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
