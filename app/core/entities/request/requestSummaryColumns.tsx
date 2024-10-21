"use client"

import { ColumnDef } from "@tanstack/react-table";
import { RequestStatus, requestStatusDisplayNames } from "../../enums/requestStatus.enum";
import { RequestType, requestTypeDisplayNames } from "../../enums/requestType.enum";
import { createSortableColumn } from "../basics/baseEntity";
import { Request } from "./request";

export const requestSummaryColumns = (): ColumnDef<Request>[] => [
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
        accessorKey: "status",
        header: ({ column }) => {
            return createSortableColumn(column, "Status")
        },
        cell: ({ row }) => {
            return (requestStatusDisplayNames[row.getValue('status') as RequestStatus])
        }
    },
]