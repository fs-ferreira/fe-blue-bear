"use client"

import { Course } from "@/app/core/entities/courses/course";
import { PageLayout } from "@/components/shared/PageLayout";
import { CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursesPage() {
    const { data: session }: any = useSession();
    const [courses, setCourses] = useState<Course[]>([]);
    const [reloadCourses, setReloadCourses] = useState(true);
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
            <CardFooter className="flex justify-between">
                <Button variant={"outline"} onClick={() => router.push('/main')}>Voltar</Button>
            </CardFooter>
        </PageLayout>
    );
}