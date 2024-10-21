"use client"

import { formatDateSample } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentStatus, paymentStatusDisplayNames } from "../../enums/paymentStatus.enum";
import { createSortableColumn } from "../basics/baseEntity";
import { PaymentSummary } from "./paymentSummary";


export const paymentSummaryColumns = (): ColumnDef<PaymentSummary>[] => [
    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            return createSortableColumn(column, "Data de vencimento");
        },
        cell: ({ row }) => {
            return <div>{formatDateSample(row.getValue("dueDate"))}</div>;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return createSortableColumn(column, "Status do pagamento");
        },
        cell: ({ row }) => {
            return (paymentStatusDisplayNames[row.getValue('status') as PaymentStatus])
        }
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return createSortableColumn(column, "Valor");
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return formatted
        },
    },
];
