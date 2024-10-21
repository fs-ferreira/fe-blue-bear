"use client";

import { ColumnDef } from "@tanstack/react-table";
import { createSortableColumn } from "../basics/baseEntity";
import { UserPermission } from "./userPermission";
import { useState } from "react";
import PermissionCheckbox from "@/components/resources/PermissionCheckbox ";

const useCheckboxHandler = (row: UserPermission, key: keyof UserPermission) => {
    const [isChecked, setIsChecked] = useState<boolean>(!!row[key]);

    const handleCheckboxChange = (value: boolean) => {
        setIsChecked(value);
        //@ts-ignore
        row[key] = value;
    };

    return { isChecked, handleCheckboxChange };
};

export const userPermissionColumns = (data: UserPermission[]): ColumnDef<UserPermission>[] => {
    const [selectAllView, setSelectAllView] = useState<boolean>(false);
    const [selectAllCreate, setSelectAllCreate] = useState<boolean>(false);
    const [selectAllEdit, setSelectAllEdit] = useState<boolean>(false);
    const [selectAllDelete, setSelectAllDelete] = useState<boolean>(false);

    const handleSelectAll = (
        columnKey: keyof UserPermission,
        setAll: React.Dispatch<React.SetStateAction<boolean>>,
        value: boolean
    ) => {
        setAll(value);
        data.forEach((row) => {
            //@ts-ignore
            row[columnKey] = value;
        });
    };

    return [
        {
            accessorKey: "resource",
            header: ({ column }) => {
                return createSortableColumn(column, "Recurso");
            },
        },
        {
            accessorKey: "view",
            header: () => (
                <div className="flex gap-2 items-center justify-center">
                    <span>Visualizar</span>
                    <PermissionCheckbox
                        value={selectAllView}
                        onChange={(value) => handleSelectAll('view', setSelectAllView, value)}
                    />
                </div>
            ),
            cell: ({ row }) => {
                const { isChecked, handleCheckboxChange } = useCheckboxHandler(row.original, 'view');
                return (
                    <PermissionCheckbox
                        value={isChecked}
                        onChange={handleCheckboxChange}
                    />
                );
            },
        },
        {
            accessorKey: "create",
            header: () => (
                <div className="flex gap-2 items-center justify-center">
                    <span>Adicionar</span>
                    <PermissionCheckbox
                        value={selectAllCreate}
                        onChange={(value) => handleSelectAll('create', setSelectAllCreate, value)}
                    />
                </div>
            ),
            cell: ({ row }) => {
                const { isChecked, handleCheckboxChange } = useCheckboxHandler(row.original, 'create');
                return (
                    <PermissionCheckbox
                        value={isChecked}
                        onChange={handleCheckboxChange}
                    />
                );
            },
        },
        {
            accessorKey: "edit",
            header: () => (
                <div className="flex gap-2 items-center justify-center">
                    <span>Modificar</span>
                    <PermissionCheckbox
                        value={selectAllEdit}
                        onChange={(value) => handleSelectAll('edit', setSelectAllEdit, value)}
                    />
                </div>
            ),
            cell: ({ row }) => {
                const { isChecked, handleCheckboxChange } = useCheckboxHandler(row.original, 'edit');
                return (
                    <PermissionCheckbox
                        value={isChecked}
                        onChange={handleCheckboxChange}
                    />
                );
            },
        },
        {
            accessorKey: "delete",
            header: () => (
                <div className="flex gap-2 items-center justify-center">
                    <span>Excluir</span>
                    <PermissionCheckbox
                        value={selectAllDelete}
                        onChange={(value) => handleSelectAll('delete', setSelectAllDelete, value)}
                    />
                </div>
            ),
            cell: ({ row }) => {
                const { isChecked, handleCheckboxChange } = useCheckboxHandler(row.original, 'delete');
                return (
                    <PermissionCheckbox
                        value={isChecked}
                        onChange={handleCheckboxChange}
                    />
                );
            },
        },
    ];
};
