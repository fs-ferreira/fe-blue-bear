"use client"

import { ColumnDef } from "@tanstack/react-table";
import { createSortableColumn } from "../basics/baseEntity";
import { Grade } from "./grade";
import { GradeDisciplineStatus, gradeStatusDisplayNames } from "../../enums/gradeDisciplineStatus.enum";

export const gradeColumns = (): ColumnDef<Grade>[] => [
    {
        accessorKey: "discipline.name",
        header: ({ column }) => {
            return createSortableColumn(column, "Disciplina");
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return createSortableColumn(column, "Status");
        },
        cell: ({ row }) => {
            const value = gradeStatusDisplayNames[row.getValue('status') as GradeDisciplineStatus]
            switch (value) {
                case 'Aprovado':
                    return <span className="text-lime-600">{value}</span>
                case 'Reprovado':
                    return <span className="text-destructive">{value}</span>
                default:
                    return value
            }
        }
    },
    {
        accessorKey: "gradeValue",
        header: ({ column }) => {
            return createSortableColumn(column, "Nota");
        },
        cell: ({ row }) => {
            const grade = row.original;
            return grade.gradeValue == 0 && grade.status === GradeDisciplineStatus.IN_PROGRESS ? '-' : grade.gradeValue
        }
    },

];