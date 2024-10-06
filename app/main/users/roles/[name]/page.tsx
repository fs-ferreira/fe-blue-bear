"use client";
import { UserPermission } from "@/app/core/entities/rolePermissions/userPermission";
import { RolePermissionService } from "@/app/core/services/rolePermissionService";
import { PageLayout } from "@/components/shared/PageLayout"
import { CardContent } from "@/components/ui/card"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { name: string } }) {

  const { data: session } = useSession();
  const [permissions, setPermissions] = useState<UserPermission[]>([]);


  const rolePermissionService = new RolePermissionService(session);

  const fetchPermissions = async () => {
    const permissions = await rolePermissionService.findAllByRoleName(params.name);
    setPermissions(permissions);
  };

  useEffect(() => {
    if (session) {
      fetchPermissions();
    }
  }, [session]);


  return (
    <PageLayout title="Controle de Recursos e Permissões">

      <CardContent>
        <div>My Post: {params.name}</div>
      </CardContent>
    </PageLayout>
  )

}