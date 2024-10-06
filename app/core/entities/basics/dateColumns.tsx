import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { createSortableColumn } from "./baseEntity";

export function dateColumns<T>(sortable = false): ColumnDef<T>[] {
    if (sortable) {
        return [
            {
                accessorKey: "updatedAt",
                header: ({ column }) => {
                    return createSortableColumn(column, "Modificado")
                },
                cell: ({ row }) => {
                    return <div>{formatDate(row.getValue("updatedAt"))}</div>;
                },
            },
            {
                accessorKey: "createdAt",
                header: ({ column }) => {
                    return createSortableColumn(column, "Criado")
                },
                cell: ({ row }) => {
                    return <div>{formatDate(row.getValue("createdAt"))}</div>;
                },
            }
        ];
    }
    return [
        {
            accessorKey: "updatedAt",
            header: "Modificado",
            cell: ({ row }) => {
                return <div>{formatDate(row.getValue("updatedAt"))}</div>;
            },
        },
        {
            accessorKey: "createdAt",
            header: "Criado",
            cell: ({ row }) => {
                return <div>{formatDate(row.getValue("createdAt"))}</div>;
            },
        }
    ];
}
