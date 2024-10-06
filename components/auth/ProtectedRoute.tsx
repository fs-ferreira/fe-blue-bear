'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { permissionService } from '@/app/core/services/permissionService';
import { getBaseHeaders, handleLogout } from '@/lib/utils';
import { toast } from 'sonner';
import { ErrorResponse } from '@/app/core/entities/error/errorResponse';

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { data: session, status }: any = useSession();
    const router = useRouter();
    const [permissionsLoaded, setPermissionsLoaded] = useState(false);

    async function getUserPermissions() {
        if (!permissionService.getPermissions().length && session?.accessToken && !permissionsLoaded) {
            try {

                const permissionsRes = await fetch("http://localhost:8001/users/permissions", {
                    method: 'GET',
                    headers: getBaseHeaders(session)
                });

                if (permissionsRes.ok) {
                    const permissionsData = await permissionsRes.json();
                    permissionService.setPermissions(permissionsData);
                    setPermissionsLoaded(true);
                    toast.success(`Login efetuado com sucesso. Bem vindo ${session.user.email}!`);
                } else {
                    const errorData: ErrorResponse = await permissionsRes.json()
                    toast.error(`${errorData.status} - ${errorData.detail}`);
                    handleLogout()
                }
            } catch (error) {
                console.error('Failed to fetch permissions:', error);
            }
        }
    }

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || !session.user || Object.keys(session.user).length === 0) {
            handleLogout();
        } else {
            getUserPermissions();
        }
    }, [session, status]);

    if (!session || !session.user || Object.keys(session.user).length === 0) {
        return null;
    }


    return <div className='bg-muted min-h-screen'>{children}</div>;
};

export default ProtectedRoute;
