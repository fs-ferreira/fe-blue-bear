"use client"

import { ColumnDef } from "@tanstack/react-table";
import { createSortableColumn } from "../basics/baseEntity";
import { Grade } from "./grade";
import { GradeDisciplineStatus, gradeStatusDisplayNames } from "../../enums/gradeDisciplineStatus.enum";
import { actionColumn, ActionColumnProps } from "../basics/actionColumn";

export const studentsGradesColumns = ({ hasDelete, hasEdit, deleteFn, editFn }: ActionColumnProps<Grade> = {}): ColumnDef<Grade>[] => [
    {
        accessorKey: "student.ra",
        header: ({ column }) => {
            return createSortableColumn(column, "RA");
        }
    },
    {
        accessorKey: "student.user.fullName",
        header: ({ column }) => {
            return createSortableColumn(column, "Nome");
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
    ...actionColumn<Grade>({ hasEdit, hasDelete, deleteFn, editFn })
];