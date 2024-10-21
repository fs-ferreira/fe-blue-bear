"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Semester } from "@/app/core/entities/semester/semester"
import { SemesterService } from "@/app/core/services/semester.service"
import { semesterYearPeriodSummaryDisplayNames } from "@/app/core/enums/semesterYearPeriod.enum"

interface SemesterComboboxProps {
    onSemesterSelect: (semester: Semester | null) => void;
    semesterId?: string;
    disciplineId?: string;
    disabled?: boolean
}

export function SemesterCombobox({ onSemesterSelect, semesterId, disciplineId, disabled = false }: SemesterComboboxProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const { data: session }: any = useSession();
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [reload, setReload] = useState(true);
    const semesterService = new SemesterService(session);

    const fetchSemesters = async () => {
        let semesters: Semester[] = []
        if (!disciplineId) {
            semesters = await semesterService.findAll();
        } else {
            semesters = await semesterService.findAllByDisciplineId(disciplineId);
        }
        setSemesters(semesters);
        setReload(false)
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            return;
        }
        if (session && reload) {
            fetchSemesters();
        }
    }, [session]);

    useEffect(() => {
        if (disciplineId) {
            fetchSemesters()
        }
    }, [disciplineId])

    useEffect(() => {
        if (semesterId && semesters.length > 0) {
            const semester = semesters.find((semester) => semester.id === semesterId);
            if (semester) {
                setValue(createSemesterLabel(semester));
            } else {
                setValue("");
            }
        }
    }, [semesterId, semesters]);

    const handleSelect = (currentValue: string) => {
        if (currentValue === value) {
            setValue("");
            onSemesterSelect(null);
        } else {
            setValue(currentValue);
            const selectedSemester = semesters.find((semester) => createSemesterLabel(semester) === currentValue) || null;
            onSemesterSelect(selectedSemester);
        }
        setOpen(false);
    };

    function createSemesterLabel(semester: Semester): string {
        return `${semester.course?.courseName} - ${semester.semesterNumber} - ${semester.year} - ${semesterYearPeriodSummaryDisplayNames[semester.semesterOfYear]}`
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    aria-expanded={open}
                    className={`w-full justify-between ${value === '' ? 'text-muted-foreground' : ''}`}
                >
                    <span className="max-w-[95%] text-nowrap overflow-hidden overflow-ellipsis">
                        {value
                            ? createSemesterLabel(semesters.find((semester) => createSemesterLabel(semester) === value) as Semester)
                            : "Selecionar semestre..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-1 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] pointer-events-auto">
                <Command>
                    <CommandInput placeholder="Procurar semestre..." />
                    <CommandList>
                        <CommandEmpty>Nenhum semestre encontrado</CommandEmpty>
                        <CommandGroup>
                            {semesters.map((semester) => (
                                <CommandItem
                                    key={semester.id}
                                    value={createSemesterLabel(semester)}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === createSemesterLabel(semester) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {createSemesterLabel(semester)}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
