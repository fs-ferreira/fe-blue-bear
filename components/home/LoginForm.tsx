'use client';

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (session) {
            redirectUser();
        }
    }, [session, router]);

    function redirectUser() {
        router.push('/main');
    }

    const handleSubmit = async (event: React.FormEvent<any>) => {
        setLoading(true);
        event.preventDefault();
        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        setLoading(false);
        
        if (!result?.ok) {
            toast.warning("Login inválido! Verifique suas credênciais.");
            return;
        }

    };

    return (
        <div className="flex items-center lg:w-full h-full">
            <div className="mx-auto grid sm:w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Bem vindo!</h1>
                    <p className="text-balance text-muted-foreground">
                        Insira seus dados para realizar o acesso
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="exemplo@bluebear.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Senha</Label>
                            <Link href="/#" className="ml-auto text-sm underline">
                                Esqueceu sua senha?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Entrando..." : "Login"}
                    </Button>
                    <Button disabled className="w-full">
                        Entrar com Google
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Não tem uma conta?{" "}
                    <Link href="#" className="underline font-semibold">
                        Contate um responsável
                    </Link>
                </div>
            </div>
        </div>
    );
}
