import { permissionService } from "@/app/core/services/permissionService";
import { clsx, type ClassValue } from "clsx"
import moment from "moment";
import { signOut } from "next-auth/react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(data: moment.MomentInput): string {
  moment.locale('pt-br');
  return moment(data).format('DD/MM/YYYY - HH:mm:ss');
}

export const CORE_URL = process.env.NEXT_PUBLIC_BACKEND_URL_CORE
export const FND_EDU_URL = process.env.NEXT_PUBLIC_BACKEND_URL_FND_EDU

export const getBaseHeaders = (session: { accessToken: string, user: { tenant: string } }) => {
  return {
    "Authorization": `Bearer ${session.accessToken}`,
    "X-Tenant-ID": `${session.user.tenant}`,
    "Content-Type": "application/json"
  }
}

export const handleLogout = async () => {
  permissionService.clearPermissions();
  await signOut({ callbackUrl: '/' });
};
