"use client";

import { User } from "@/app/core/entities/users/user";
import { userColumns } from "@/app/core/entities/users/userColumns";
import { UserService } from "@/app/core/services/userService";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserDialog from "@/components/users/UserDialog";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [reloadUsers, setReloadUsers] = useState(true);
    const router = useRouter();

    const userService = new UserService(session);

    const fetchUsers = async () => {
        const users = await userService.findAll();
        setUsers(users);
        setReloadUsers(false);
    };

    useEffect(() => {
        if (session && reloadUsers) {
            fetchUsers();
        }
    }, [session, reloadUsers]);

    const handleOpenDialog = (user?: User) => {
        if (user) {
            setSelectedUser(user);
        } else {
            setSelectedUser(null);
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = (reload = false) => {
        setIsDialogOpen(false);
        setReloadUsers(reload)
    };

    const handleGoToRoles = () => {
        router.push('users/roles')
    }

    const handleDisableUser = async (id: string) => {
        const response = await userService.disableUser(id);
        if (response) {
            fetchUsers();
        }
    };

    return (
        <PageLayout title="Usuários">
            {isDialogOpen && (
                <UserDialog isOpen={isDialogOpen} onClose={handleCloseDialog} user={selectedUser} />
            )}
            <div className="flex justify-between p-6 gap-3">
                <Button variant={"outline"} className="font-semibold text-muted-foreground" onClick={handleGoToRoles}>Cargos</Button>
                <Button variant={"outline"} className="w-12" onClick={() => handleOpenDialog()}><PlusIcon /></Button>
            </div>
            <CardContent>
                <DataTable columns={userColumns({ hasEdit: true, hasDelete: true, editFn: (user: User) => handleOpenDialog(user), deleteFn: handleDisableUser })} data={users} />
            </CardContent>
        </PageLayout>
    );
}
