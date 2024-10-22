"use client"

import { useState, useEffect } from "react";
import { Student } from "@/app/core/entities/student/student";
import { StudentSummary } from "@/app/core/entities/student/studentSummary";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { STUDENT_ROLE } from "@/lib/utils";
import AttendanceDialog from "./AttendanceDialog";
import { Classroom } from "@/app/core/entities/classroom/classroom";

interface DialogStateProps {
    isOpen: boolean;
    classroom?: Classroom;
}


export default function StudentsList({ students = [], classroom }: { students: Student[] | StudentSummary[]; classroom: Classroom }) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredStudents, setFilteredStudents] = useState<Student[] | StudentSummary[]>(students);
    const [dialogState, setDialogState] = useState<DialogStateProps>({ isOpen: false });
    const { data: session }: any = useSession();

    function getInitials(name: string): string {
        const words = name.trim().split(/\s+/);
        const firstInitial = words[0]?.charAt(0).toUpperCase() || '';
        const lastInitial = words.length > 1 ? words[words.length - 1].charAt(0).toUpperCase() : '';
        return firstInitial + lastInitial;
    }

    function sortFn(a: string, b: string) {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    }

    const handleOpenDialog = () => {
        setDialogState({ isOpen: true, classroom });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = students.filter(student =>
                student.user.fullName.toLowerCase().includes(lowerCaseSearchTerm)
            );
            setFilteredStudents(filtered);
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, students]);

    const handleCloseDialog = () => {
        setDialogState({ ...dialogState, isOpen: false });
    };

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            <div>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                    <h1 className="font-semibold text-xl">Alunos</h1>
                    {session?.user?.role !== STUDENT_ROLE && <Button variant={"outline"} onClick={handleOpenDialog}>Iniciar chamada</Button>}
                </div>
                <p className="font-normal text-muted-foreground">
                    Confira a lista de alunos matriculados na disciplina.
                </p>
            </div>

            <Separator />
            {dialogState.isOpen && (
                <AttendanceDialog isOpen={dialogState.isOpen} onClose={handleCloseDialog} classroom={classroom} />
            )}
            <div>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar alunos por nome"
                    className="border p-2 w-full rounded-md mb-2"
                />
            </div>

            <div className="flex flex-col w-full gap-4">
                {filteredStudents.sort((a, b) => sortFn(a.user.fullName, b.user.fullName)).map(student => (
                    <div className="flex items-center gap-4" key={student.ra}>
                        <Avatar className="size-10">
                            <AvatarFallback className="p-4">{getInitials(student.user.fullName)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">{student.user.fullName}</p>
                            <p className="text-sm text-muted-foreground">{student.user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
