import { permissionService } from "@/app/core/services/permission.service";
import { clsx, type ClassValue } from "clsx"
import moment from "moment";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(data: moment.MomentInput): string {
  moment.locale('pt-br');
  return moment(data).format('DD/MM/YYYY - HH:mm:ss');
}

export function formatDateSample(data: moment.MomentInput): string {
  moment.locale('pt-br');
  return moment(data).format('DD/MM/YYYY');
}

export const CORE_URL = process.env.NEXT_PUBLIC_BACKEND_URL_CORE
export const FND_EDU_URL = process.env.NEXT_PUBLIC_BACKEND_URL_FND_EDU
export const PROFESSOR_ROLE = process.env.NEXT_PUBLIC_PROFESSOR_ROLE_NAME
export const STUDENT_ROLE = process.env.NEXT_PUBLIC_STUDENT_ROLE_NAME
export const TENANT_ID = process.env.NEXT_PUBLIC_STUDENT_TENANT_ID

export const getBaseHeaders = (session: { accessToken: string, user: { tenant: string } }) => {
  return {
    "Authorization": `Bearer ${session.accessToken}`,
    "X-Tenant-ID": `${session.user.tenant}`,
    "Content-Type": "application/json"
  }
}

export const handleLogout = async () => {
  toast.warning("Finalizando sessão...")
  permissionService.clearPermissions();
  await signOut({ callbackUrl: '/' });
};