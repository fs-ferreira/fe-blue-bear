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
import { Discipline } from "@/app/core/entities/discipline/discipline"
import { DisciplineService } from "@/app/core/services/discipline.service"

interface DisciplineComboboxProps {
    onDisciplineSelect: (discipline: Discipline | null) => void;
    disciplineId?: string;
}

export function DisciplineCombobox({ onDisciplineSelect, disciplineId }: DisciplineComboboxProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const { data: session }: any = useSession();
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [reload, setReload] = useState(true);
    const disciplineService = new DisciplineService(session);

    const fetchDisciplines = async () => {
        const disciplines = await disciplineService.findAll();
        setDisciplines(disciplines);
        setReload(false)
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            return;
        }
        if (session && reload) {
            fetchDisciplines();
        }
    }, [session]);

    useEffect(() => {
        if (disciplineId && disciplines.length > 0) {
            const discipline = disciplines.find((discipline) => discipline.id === disciplineId);
            if (discipline) {
                setValue(discipline.name);
            } else {
                setValue("");
            }
        }
    }, [disciplineId, disciplines]);

    const handleSelect = (currentValue: string) => {
        if (currentValue === value) {
            setValue("");
            onDisciplineSelect(null);
        } else {
            setValue(currentValue);
            const selectedDiscipline = disciplines.find((discipline) => discipline.name === currentValue) || null;
            onDisciplineSelect(selectedDiscipline);
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
                            ? disciplines.find((discipline) => discipline.name === value)?.name
                            : "Selecionar disciplina..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-1 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] pointer-events-auto">
                <Command>
                    <CommandInput placeholder="Procurar disciplina..." />
                    <CommandList>
                        <CommandEmpty>Nenhum disciplina encontrado</CommandEmpty>
                        <CommandGroup>
                            {disciplines.map((discipline) => (
                                <CommandItem
                                    key={discipline.id}
                                    value={discipline.name}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === discipline.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {discipline.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
