"use client"

import { ColumnDef } from "@tanstack/react-table";
import { createSortableColumn } from "../basics/baseEntity";
import { dateColumns } from "../basics/dateColumns";
import { actionColumn, ActionColumnProps } from "../basics/actionColumn";
import { Course } from "./course";
import { CourseType, courseTypeDisplayNames } from "../../enums/courseType.enum";

export const courseColumns = ({ hasDelete, hasEdit, deleteFn, editFn }: ActionColumnProps<Course> = {}): ColumnDef<Course>[] => [
    {
        accessorKey: "courseName",
        header: ({ column }) => {
            return createSortableColumn(column, "Nome");
        }
    },
    {
        accessorKey: "courseType",
        header: ({ column }) => {
            return createSortableColumn(column, "Modelo de curso");
        },
        cell: ({ row }) => {
            return (courseTypeDisplayNames[row.getValue('courseType') as CourseType])
        }
    },
    {
        accessorKey: "numberOfSemesters",
        header: ({ column }) => {
            return createSortableColumn(column, "Qtd. de Semestres");
        }
    },
    {
        accessorKey: "monthlyFee",
        header: ({ column }) => {
            return createSortableColumn(column, "Mensalidade");
        },
        cell: ({ row }) => {
            const monthlyFee = parseFloat(row.getValue("monthlyFee"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(monthlyFee)

            return formatted
        },
    },
    ...dateColumns<Course>(true),
    ...actionColumn<Course>({ hasEdit, hasDelete, deleteFn, editFn })
];