import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { forwardRef } from "react";

interface ConfirmDialogProps {
    onConfirm: () => void;
    children: React.ReactNode;
}

export const ConfirmDialog = forwardRef<HTMLButtonElement, ConfirmDialogProps>(
    ({ onConfirm, children }, ref) => (
        <AlertDialog>
            <AlertDialogTrigger asChild ref={ref} >
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Deseja continuar?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
);

ConfirmDialog.displayName = "ConfirmDialog";
