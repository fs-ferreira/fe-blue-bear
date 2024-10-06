"use client"

import { Role } from "@/app/core/entities/roles/role";
import { roleColumns } from "@/app/core/entities/roles/roleColumns";
import { RoleService } from "@/app/core/services/roleService";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RolesPage() {
    const { data: session } = useSession();
    const [roles, setRoles] = useState<Role[]>([]);
    const [roleName, setRoleName] = useState<string>("");
    const router = useRouter()


    const roleService = new RoleService(session);

    const fetchRoles = async () => {
        const roles = await roleService.findAll();
        setRoles(roles);
    };

    useEffect(() => {
        if (session) {
            fetchRoles();
        }
    }, [session]);

    const handleDeleteById = async (id: string) => {
        const response = await roleService.deleteById(id);
        if (response) {
            fetchRoles();
        }
    };

    const handleCreateRole = async () => {
        if (roleName) {
            await roleService.save({ name: roleName } as any);
            setRoleName('');
            fetchRoles();
        }
    }

    function goToResources(role: Role) {
        router.push(`roles/${role.name}`)
    }

    return (
        <PageLayout title="Cargos">
            <div className="flex flex-col p-6 gap-3">
                <h2 className="font-semibold">Adicionar cargo</h2>
                <div className="flex gap-2">
                    <Input type="text" placeholder="Insira o nome do cargo" value={roleName} onChange={e => setRoleName(e.target.value)} className="sm:w-1/3" />
                    <Button variant={"outline"} className="w-12" onClick={handleCreateRole}><PlusIcon /></Button>
                </div>
            </div>
            <CardContent>
                <DataTable columns={roleColumns({ hasDelete: true, deleteFn: handleDeleteById, hasEdit: true, editFn: goToResources })} data={roles} />
            </CardContent>
        </PageLayout>
    )
}