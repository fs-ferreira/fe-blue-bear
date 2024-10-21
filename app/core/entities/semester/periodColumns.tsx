"use client"

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { SemesterYearPeriod, semesterYearPeriodDisplayNames } from "../../enums/semesterYearPeriod.enum";
import { ActionColumnProps } from "../basics/actionColumn";
import { createSortableColumn } from "../basics/baseEntity";
import { CourseSemesterInfo } from "./courseSemesterInfo";

export const periodColumns = ({ deleteFn }: ActionColumnProps<CourseSemesterInfo> = {}): ColumnDef<CourseSemesterInfo>[] => [
    {
        accessorKey: "courseName",
        header: ({ column }) => {
            return createSortableColumn(column, "Curso");
        }
    },
    {
        accessorKey: "year",
        header: ({ column }) => {
            return createSortableColumn(column, "Ano");
        }
    },
    {
        accessorKey: "semesterOfYear",
        header: ({ column }) => {
            return createSortableColumn(column, "Período");
        },
        cell: ({ row }) => {
            return (semesterYearPeriodDisplayNames[row.getValue('semesterOfYear') as SemesterYearPeriod])
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const rowId = row.original.sequentialKey
            return (
                <TooltipProvider>
                    <Tooltip>
                        <ConfirmDialog onConfirm={() => deleteFn?.(rowId)}>
                            <TooltipTrigger asChild>
                                <Button variant={"destructive"} className="w-12" >
                                    <Trash />
                                </Button>
                            </TooltipTrigger>
                        </ConfirmDialog>
                        <TooltipContent className="bg-destructive dark:text-secondary-foreground" side="bottom">Excluir</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
];