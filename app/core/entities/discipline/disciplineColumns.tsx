"use client"

import { ColumnDef } from "@tanstack/react-table";
import { createSortableColumn } from "../basics/baseEntity";
import { dateColumns } from "../basics/dateColumns";
import { actionColumn, ActionColumnProps } from "../basics/actionColumn";
import { Discipline } from "./discipline";

export const disciplineColumns = ({ hasDelete, hasEdit, deleteFn, editFn }: ActionColumnProps<Discipline> = {}): ColumnDef<Discipline>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return createSortableColumn(column, "Nome");
        }
    },
    {
        accessorKey: "creditHours",
        header: ({ column }) => {
            return createSortableColumn(column, "Carga Horária (h)");
        }
    },
    ...dateColumns<Discipline>(true),
    ...actionColumn<Discipline>({ hasEdit, hasDelete, deleteFn, editFn })
];