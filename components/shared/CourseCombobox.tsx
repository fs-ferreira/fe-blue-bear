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
import { Course } from "@/app/core/entities/course/course"
import { CourseService } from "@/app/core/services/course.service"

interface CourseComboboxProps {
    onCourseSelect: (course: Course | null) => void;
    courseId?: string;
}

export function CourseCombobox({ onCourseSelect, courseId }: CourseComboboxProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const { data: session }: any = useSession();
    const [courses, setCourses] = useState<Course[]>([]);
    const [reload, setReload] = useState(true);
    const courseService = new CourseService(session);

    const fetchCourses = async () => {
        const courses = await courseService.findAll();
        setCourses(courses);
        setReload(false)
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            return;
        }
        if (session && reload) {
            fetchCourses();
        }
    }, [session]);

    useEffect(() => {
        if (courseId && courses.length > 0) {
            const course = courses.find((course) => course.id === courseId);
            if (course) {
                setValue(course.courseName);
            } else {
                setValue("");
            }
        }
    }, [courseId, courses]);

    const handleSelect = (currentValue: string) => {
        if (currentValue === value) {
            setValue("");
            onCourseSelect(null);
        } else {
            setValue(currentValue);
            const selectedCourse = courses.find((course) => course.courseName === currentValue) || null;
            onCourseSelect(selectedCourse);
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
                            ? courses.find((course) => course.courseName === value)?.courseName
                            : "Selecionar curso..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-1 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] pointer-events-auto">
                <Command>
                    <CommandInput placeholder="Procurar curso..." />
                    <CommandList>
                        <CommandEmpty>Nenhum curso encontrado</CommandEmpty>
                        <CommandGroup>
                            {courses.map((course) => (
                                <CommandItem
                                    key={course.id}
                                    value={course.courseName}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === course.courseName ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {course.courseName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
