import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export const createSortableColumn = (column: Column<any, any>, columnName: string) => {
    return (
        <Button
            variant="ghost"
            className="font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {columnName}
            <CaretSortIcon className="ml-1 h-4 w-4" />
        </Button>
    )
}