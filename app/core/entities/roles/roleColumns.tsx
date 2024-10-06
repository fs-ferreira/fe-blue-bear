"use client"

import { ColumnDef } from "@tanstack/react-table";
import { createSortableColumn } from "../basics/baseEntity";
import { dateColumns } from "../basics/dateColumns";
import { Role } from "./role";
import { actionColumn, ActionColumnProps } from "../basics/actionColumn";

export const roleColumns = ({ hasDelete, hasEdit, deleteFn, editFn }: ActionColumnProps<Role> = {}): ColumnDef<Role>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return createSortableColumn(column, "Nome");
        }
    },
    ...dateColumns<Role>(true),
    ...actionColumn<Role>({ hasEdit, hasDelete, deleteFn, editFn })
];