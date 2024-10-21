"use client";
import { SavePermissionInBatch } from "@/app/core/entities/rolePermission/savePermissionInBatch";
import { UserPermission } from "@/app/core/entities/rolePermission/userPermission";
import { userPermissionColumns } from "@/app/core/entities/rolePermission/userPermissionColumns";
import { RolePermissionService } from "@/app/core/services/rolePermission.service";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { name: string } }) {

  const { data: session }:any = useSession();
  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [reloadPermissions, setReloadPermissions] = useState(true);
  const router = useRouter()

  const rolePermissionService = new RolePermissionService(session);

  const fetchPermissions = async () => {
    const permissions = await rolePermissionService.findAllByRoleName(params.name);
    setPermissions(permissions);
    setReloadPermissions(false);
  };

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      router.replace('/nao-autorizado')
    }
    if (session && reloadPermissions) {
      fetchPermissions();
    }
  }, [session, reloadPermissions]);

  const updateBatchPermissions = async () => {
    const requestBody: SavePermissionInBatch = {
      roleName: params.name,
      resourcePermissions: permissions
    }
    await rolePermissionService.updateBatch(requestBody);
    setReloadPermissions(true)
  };



  return (
    <PageLayout title="Controle de Recursos e Permissões">

      <CardContent className="pt-6">
        <DataTable columns={userPermissionColumns(permissions)} data={permissions} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={router.back}>Voltar</Button>
        <Button variant={"default"} onClick={updateBatchPermissions}>Salvar Mudanças</Button>
      </CardFooter>
    </PageLayout>
  )

}