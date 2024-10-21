"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "./student";
import { actionColumn, ActionColumnProps } from "../basics/actionColumn";
import { createSortableColumn } from "../basics/baseEntity";
import { dateColumns } from "../basics/dateColumns";

export const studentColumns = ({ hasDelete, hasEdit, deleteFn, editFn }: ActionColumnProps<Student> = {}): ColumnDef<Student>[] => [
    {
        accessorKey: "ra",
        header: ({ column }) => {
            return createSortableColumn(column, "RA")
        }
    },
    {
        accessorKey: "user.fullName",
        header: ({ column }) => {
            return createSortableColumn(column, "Nome")
        }
    },
    {
        accessorKey: "user.email",
        header: ({ column }) => {
            return createSortableColumn(column, "Email")
        }
    },
    {
        accessorKey: "course.courseName",
        header: ({ column }) => {
            return createSortableColumn(column, "Curso")
        }
    },
    {
        accessorKey: "graduated",
        header: ({ column }) => {
            return createSortableColumn(column, "Graduado")
        },
        cell: ({ row }) => {
            return (
                row.getValue('graduated') ? 'Sim' : 'Não'
            )
        }
    },
    ...dateColumns<Student>(true),
    ...actionColumn<Student>({ hasEdit, hasDelete, deleteFn, editFn })
]