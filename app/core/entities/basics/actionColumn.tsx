import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

export interface ActionColumnProps<T> {
    hasDelete?: boolean;
    deleteFn?: (id: string) => void;
    hasEdit?: boolean;
    editFn?: (entity: T) => void;
}

export function actionColumn<T extends { id: string }>({ hasDelete, deleteFn, hasEdit, editFn }: ActionColumnProps<T>): ColumnDef<T>[] {
    return [
        {
            id: "actions",
            cell: ({ row }) => {
                const rowId = row.original.id;
                return (
                    <TooltipProvider>
                        <div className="flex justify-center gap-2">
                            {hasEdit &&
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant={"outline"} className="w-12" onClick={() => editFn?.(row.original)}>
                                            <Pencil />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-card-foreground" side="bottom">Editar</TooltipContent>
                                </Tooltip>
                            }
                            {hasDelete &&
                                <Tooltip>
                                    <ConfirmDialog onConfirm={() => deleteFn?.(rowId)}>
                                        <TooltipTrigger asChild>
                                            <Button variant={"destructive"} className="w-12" >
                                                <Trash />
                                            </Button>
                                        </TooltipTrigger>
                                    </ConfirmDialog>
                                    <TooltipContent className="bg-destructive dark:text-secondary-foreground" side="bottom">Excluir</TooltipContent>
                                </Tooltip>
                            }
                        </div>
                    </TooltipProvider>
                );
            },
        },
    ];
}

