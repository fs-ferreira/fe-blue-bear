"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { CourseSemesterInfo } from "@/app/core/entities/semester/courseSemesterInfo"
import { semesterYearPeriodDisplayNames } from "@/app/core/enums/semesterYearPeriod.enum"
import { SemesterService } from "@/app/core/services/semester.service"
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
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface SemesterComboboxProps {
    onSemesterSelect: (semester: CourseSemesterInfo | null) => void;
    semesterId?: string;
}

export function SemesterPeriodCombobox({ onSemesterSelect, semesterId }: SemesterComboboxProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const { data: session }: any = useSession();
    const [semesters, setSemesters] = useState<CourseSemesterInfo[]>([]);
    const [reload, setReload] = useState(true);
    const semesterService = new SemesterService(session);

    const fetchSemesters = async () => {
        let semesters: CourseSemesterInfo[] = []
        semesters = await semesterService.findAllUniqueSequentialKeys();
        if (semesters.length) {
            semesters.forEach(semester => {
                semester.label = `${semester.courseName} - ${semester.year}/${semesterYearPeriodDisplayNames[semester.semesterOfYear]}`
            })
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
        if (semesterId && semesters.length > 0) {
            const semester = semesters.find((semester) => semester.semesterSequenceId === semesterId);
            if (semester) {
                setValue(semester.label || '');
            } else {
                setValue("");
            }
        }
    }, [semesterId, semesters]);

    const handleSelect = (currentValue: string) => {
        console.warn(currentValue);

        if (currentValue === value) {
            setValue("");
            onSemesterSelect(null);
        } else {
            const selectedSemester = semesters.find((semester) => semester.label === currentValue) || null;
            onSemesterSelect(selectedSemester);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between ${value === '' ? 'text-muted-foreground' : ''}`}
                >
                    <span className="max-w-[95%] text-nowrap overflow-hidden overflow-ellipsis">
                        {value
                            ? semesters.find((semester) => semester.label === value)?.label
                            : "Selecionar período..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-1 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] pointer-events-auto">
                <Command>
                    <CommandInput placeholder="Procurar período..." />
                    <CommandList>
                        <CommandEmpty>Nenhum curso encontrado</CommandEmpty>
                        <CommandGroup>
                            {semesters.map((semester) => (
                                <CommandItem
                                    key={semester.semesterSequenceId}
                                    value={semester.label}
                                    onSelect={handleSelect}

                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === semester.label ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {semester.label || "Período inválido"}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
