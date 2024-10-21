"use client";

import { ClassroomSummary } from "@/app/core/entities/classroom/classroomSumary";
import { Semester } from "@/app/core/entities/semester/semester";
import { SemesterCycle } from "@/app/core/entities/semester/semesterCycle";
import { semesterYearPeriodDisplayNames } from "@/app/core/enums/semesterYearPeriod.enum";
import { SemesterService } from "@/app/core/services/semester.service";
import { StudentService } from "@/app/core/services/student.service";
import ClassroomCard from "@/components/classroom/ClassroomCard";
import ClassroomSheet from "@/components/classroom/ClassroomSheet";
import Loader from "@/components/shared/Loader";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PROFESSOR_ROLE, STUDENT_ROLE } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface DialogStateProps {
    isOpen: boolean;
}

const createStudentSchema = () => {
    return z.object({
        ra: z.string().min(8, 'Insira um valor de 8 dígitos').max(8, 'Insira um valor de 8 dígitos').trim().or(z.literal(''))
    });
};

export default function ClassroomsPage() {

    const { data: session }: any = useSession();
    const [semesterCycle, setSemesterCycle] = useState<SemesterCycle>();
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [currentSemester, setCurrentSemester] = useState<Semester>();
    const [classrooms, setClassrooms] = useState<ClassroomSummary[]>([]);
    const [reloadSemesters, setReloadSemesters] = useState(true);
    const [dialogState, setDialogState] = useState<DialogStateProps>({ isOpen: false });
    const [adminUser, setAdminUser] = useState(false);
    const [professorUser, setProfessorUser] = useState(false);
    const [studentUser, setStudentUser] = useState(false);

    const formSchema = createStudentSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ra: '',
        },
    });

    const semesterService = new SemesterService(session);
    const studentService = new StudentService(session);

    const fetchSemesters = async () => {
        const ra = form.getValues("ra");
        if (ra.length < 8) {
            toast.info('Insira um RA de 8 dígitos.')
            return;
        }
        const response = await semesterService.findByStudentRa(ra);
        setReloadSemesters(false)
        if (!response) {
            return;
        }
        setSemesterCycle(response);
        setSemesters(response.semesters)
    };

    const fetchSemestersByProfessor = async (id: string) => {
        const response = await semesterService.findAllByProfessorId(id);
        setReloadSemesters(false)
        if (!response) return;
        setSemesters(response);
    };

    const fetchStudent = async (email: string) => {
        const response = await studentService.findByUserEmail(email);
        if (!response) return;
        form.setValue('ra', response.ra)
        fetchSemesters();
    };

    useEffect(() => {
        if (!session) return;

        if (session.user.role === 'admin') {
            setAdminUser(true);
            setReloadSemesters(false)
        } else if (session.user.role === PROFESSOR_ROLE && reloadSemesters) {
            setProfessorUser(true);
            fetchSemestersByProfessor(session.user.id);
        } else if (session.user.role === STUDENT_ROLE && reloadSemesters) {
            setStudentUser(true);
            fetchStudent(session.user.email);
        }
    }, [session, reloadSemesters]);


    const handleClearFilter = () => {
        form.reset();
        setClassrooms([])
        setSemesters([])
        setCurrentSemester(undefined)
        setSemesterCycle(undefined);
    };

    function createSemesterLabel(semester: Semester): string {
        const courseName = adminUser || studentUser ? '' : `${semester.course?.courseName} - `
        return `${courseName}${semester.semesterNumber} - ${semester.year}/${semesterYearPeriodDisplayNames[semester.semesterOfYear]}`
    }

    function handleSetClassrooms(id: string) {
        const semester = semesters.find(el => el.id === id)
        setCurrentSemester(semester)
        setClassrooms(semester?.classrooms || []);
    }

    const handleOpenDialog = () => {
        setDialogState({ isOpen: true });
    };

    const handleCloseDialog = (reload = false) => {
        setDialogState({ ...dialogState, isOpen: false });
        setReloadSemesters(reload);
    };



    return (
        <PageLayout title="Salas de aula">
            {dialogState.isOpen && (
                <ClassroomSheet isOpen={dialogState.isOpen} onClose={handleCloseDialog} />
            )}
            {adminUser &&
                <div className="p-6 pb-2 space-y-6">
                    <h3 className="font-medium">Painel do administrador</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(() => fetchSemesters())} className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 items-end gap-2">
                            <FormField
                                control={form.control}
                                name="ra"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RA do aluno</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Pesquise pelo RA do aluno" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-2">
                                <Button variant={"outline"} className="w-12" type="submit"><Search /></Button>
                                <Button disabled={!semesterCycle} variant={"outline"} type="submit" onClick={handleClearFilter}>Limpar Filtro</Button>
                            </div>
                            <Button variant={"outline"} type="submit" onClick={handleOpenDialog}>Adicionar Salas</Button>
                        </form>
                    </Form>
                    <Separator />
                </div>
            }
            {(semesterCycle || !!semesters.length) &&
                <div className="p-6 space-y-8">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        {semesterCycle && <h2 className="font-semibold text-xl">{semesterCycle.course.courseName}</h2>}
                        {!semesterCycle && <h2 className="font-semibold text-xl">{currentSemester ?
                            currentSemester.course.courseName :
                            <span className="animate-pulse font-medium text-base">Aguardando seleção...</span>}
                        </h2>}
                        <Select
                            onValueChange={handleSetClassrooms}
                            value={currentSemester?.id || ''}
                            defaultValue=""
                        >
                            <SelectTrigger className="sm:w-1/2">
                                <SelectValue placeholder="Selecione um semestre" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    semesters.map((semester) => (
                                        <SelectItem
                                            key={semester.id}
                                            value={semester.id}
                                        >
                                            {createSemesterLabel(semester)}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            }

            <CardContent>
                {(reloadSemesters && !adminUser) && <Loader />}
                <div className="space-y-4">
                    {classrooms.length > 0 && classrooms.map(el => {
                        return <ClassroomCard key={el.id} classroom={el}/>
                    })}
                </div>
                {!semesters &&
                    <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-center px-4">
                        <h2 className="text-lg font-semibold">Não há aulas cadastradas.</h2>
                        <p>Por favor, contate a gestão da faculdade.</p>
                    </div>
                }

                {currentSemester && !currentSemester.classrooms.length &&
                    <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-center px-4">
                        <h2 className="text-lg font-semibold">Não há aulas cadastradas.</h2>
                        <p>Ainda não existem aulas cadastradas para esse semestre</p>
                    </div>
                }

                {(!currentSemester && !reloadSemesters) &&
                    <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-center px-4">
                        <h2 className="text-lg font-semibold">Aguardando seleção...</h2>
                        {professorUser && <p>Para visualizar suas salas de aula, selecione um semestre.</p>}
                        {adminUser && <p>Para visualizar as salas de aula, insira o RA do aluno e escolha um semestre.</p>}
                    </div>
                }

            </CardContent>
        </PageLayout>
    )
}