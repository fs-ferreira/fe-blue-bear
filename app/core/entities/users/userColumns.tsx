"use client"

import { ColumnDef } from "@tanstack/react-table";
import { createSortableColumn } from "../basics/baseEntity";
import { User } from "./user";
import { dateColumns } from "../basics/dateColumns";
import { actionColumn, ActionColumnProps } from "../basics/actionColumn";

export const userColumns = ({ hasDelete, hasEdit, deleteFn, editFn }: ActionColumnProps<User> = {}): ColumnDef<User>[] => [
    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return createSortableColumn(column, "Nome")
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return createSortableColumn(column, "E-mail")
        }
    },
    {
        accessorKey: "roleName",
        header: ({ column }) => {
            return createSortableColumn(column, "Cargo")
        }
    },
    ...dateColumns<User>(true),
    ...actionColumn<User>({ hasEdit, hasDelete, deleteFn, editFn })
]