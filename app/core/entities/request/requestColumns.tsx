"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Request } from "./request";
import { actionColumn, ActionColumnProps } from "../basics/actionColumn";
import { createSortableColumn } from "../basics/baseEntity";
import { dateColumns } from "../basics/dateColumns";
import { RequestType, requestTypeDisplayNames } from "../../enums/requestType.enum";
import { RequestStatus, requestStatusDisplayNames } from "../../enums/requestStatus.enum";

export const requestColumns = ({ hasDelete, hasEdit, deleteFn, editFn }: ActionColumnProps<Request> = {}): ColumnDef<Request>[] => [
    {
        accessorKey: "protocolNumber",
        header: ({ column }) => {
            return createSortableColumn(column, "Nº de Protocolo")
        }
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return createSortableColumn(column, "Título")
        }
    },
    {
        accessorKey: "requestType",
        header: ({ column }) => {
            return createSortableColumn(column, "Assunto")
        },
        cell: ({ row }) => {
            return (requestTypeDisplayNames[row.getValue('requestType') as RequestType])
        }
    },
    {
        accessorKey: "student.ra",
        header: ({ column }) => {
            return createSortableColumn(column, "RA do aluno")
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return createSortableColumn(column, "Status")
        },
        cell: ({ row }) => {
            return (requestStatusDisplayNames[row.getValue('status') as RequestStatus])
        }
    },
    ...dateColumns<Request>(true),
    ...actionColumn<Request>({ hasEdit, hasDelete, deleteFn, editFn })
]