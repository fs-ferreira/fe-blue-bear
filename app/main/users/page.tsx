"use client";

import { User } from "@/app/core/entities/user/user";
import { userColumns } from "@/app/core/entities/user/userColumns";
import { UserService } from "@/app/core/services/user.service";
import { DataTable } from "@/components/shared/DataTable";
import Loader from "@/components/shared/Loader";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import UserDialog from "@/components/users/UserDialog";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface DialogStateProps {
    isOpen: boolean;
    user: User | null;
}

export default function UsersPage() {
    const { data: session }: any = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [dialogState, setDialogState] = useState<DialogStateProps>({ isOpen: false, user: null });
    const [reloadUsers, setReloadUsers] = useState(true);
    const router = useRouter();

    const userService = new UserService(session);

    const fetchUsers = async () => {
        const users = await userService.findAll();
        setUsers(users);
        setReloadUsers(false);
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadUsers) {
            fetchUsers();
        }
    }, [session, reloadUsers]);

    const handleOpenDialog = (user?: User) => {
        setDialogState({ isOpen: true, user: user || null});
    };
    
    const handleCloseDialog = (reload = false) => {
        setDialogState({ ...dialogState, isOpen: false });
        setReloadUsers(reload);
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
            {dialogState.isOpen && (
                <UserDialog isOpen={dialogState.isOpen} onClose={handleCloseDialog} user={dialogState.user} />
            )}
            <div className="flex justify-between p-6 gap-3">
                <Button variant={"outline"} className="font-semibold text-muted-foreground" onClick={handleGoToRoles}>Cargos</Button>
                <Button variant={"outline"} className="w-12" onClick={() => handleOpenDialog()}><PlusIcon /></Button>
            </div>
            <CardContent>
                <DataTable columns={userColumns({ hasEdit: true, hasDelete: true, editFn: (user: User) => handleOpenDialog(user), deleteFn: handleDisableUser })} data={users} />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"outline"} onClick={() => router.push('/main')}>Voltar</Button>
            </CardFooter>
        </PageLayout>
    );
}
