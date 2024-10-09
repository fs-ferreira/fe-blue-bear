"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotAuthorizedPage() {
    const router = useRouter()
    const { data: session }: any = useSession();

    useEffect(() => {
        if (!session || !session.user || Object.keys(session.user).length === 0) {
            router.replace('/')
        }
    }, [session])

    if (!session || !session.user || Object.keys(session.user).length === 0) {
        return null
    }
    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center gap-5 text-center px-3">
            <span className="text-3xl font-bold">
                403 - Não autorizado!
            </span>
            <span className="text-lg text-center">Você não tem acesso para visualizar este recurso.</span>
            <Button className="w-40" variant={"destructive"} onClick={() => router.replace('/main')}>Voltar ao inicio</Button>
        </div>
    )
}