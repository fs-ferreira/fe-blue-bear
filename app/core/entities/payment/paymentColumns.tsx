"use client"

import { formatDateSample } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentStatus, paymentStatusDisplayNames } from "../../enums/paymentStatus.enum";
import { createSortableColumn } from "../basics/baseEntity";
import { PaymentSummary } from "./paymentSummary";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Check, Pencil, RefreshCcw, Trash } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export interface PaymentColunsProps {
    checkPaymentFn: (payment: PaymentSummary) => {};
    confirmPaymentFn: (payment: PaymentSummary) => {};
}


export const paymentColumns = ({ checkPaymentFn, confirmPaymentFn }: PaymentColunsProps): ColumnDef<PaymentSummary>[] => [
    {
        accessorKey: "student.ra",
        header: ({ column }) => {
            return createSortableColumn(column, "RA");
        }
    },
    {
        accessorKey: "student.user.fullName",
        header: ({ column }) => {
            return createSortableColumn(column, "Aluno");
        }
    },
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
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <TooltipProvider>
                    <div className="flex justify-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button disabled={row.original.status === PaymentStatus.PAID} variant={"outline"} className="w-12" onClick={() => checkPaymentFn(row.original)}>
                                    <RefreshCcw />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-card-foreground" side="bottom">Atualizar status</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <ConfirmDialog onConfirm={() => confirmPaymentFn(row.original)}>
                                <TooltipTrigger asChild>
                                    <Button disabled={row.original.status === PaymentStatus.PAID} className="w-12 bg-lime-500 hover:bg-lime-600" >
                                        <Check />
                                    </Button>
                                </TooltipTrigger>
                            </ConfirmDialog>
                            <TooltipContent className="bg-lime-600 dark:text-secondary-foreground" side="bottom">Confirmar pagamento</TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            );
        },
    },
];
