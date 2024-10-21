"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { ptBR } from "date-fns/locale";

interface DatePickerProps {
    onDateSelect: (date: Date | undefined) => void;
    value?: Date;
}

export function DatePicker({ onDateSelect, value }: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(value)

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate)
        onDateSelect(selectedDate)
    }

    useEffect(() => {
        if (value && !date) {
            const adjustedDate = new Date(value.getTime() + (3 * 60 * 60 * 1000));
            handleSelect(adjustedDate);
        }
    }, [value])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={handleSelect}
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    defaultMonth={date ? new Date(date) : undefined}
                    locale={ptBR}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
