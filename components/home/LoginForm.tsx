'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "../shared/SubmitButton";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const createLoginSchema = () => {
    return z.object({
        email: z.string().email("Email inválido").trim(),
        password: z.string().min(1, "Senha inválida").trim()
    });
};

export default function LoginForm() {
    const [loading, setLoading] = useState(false);

    const formSchema = createLoginSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        });

        if (!result?.ok) {
            toast.warning("Login inválido! Verifique suas credênciais.");
            setLoading(false);
            return;
        }
    }

    return (
        <div className="flex items-center lg:w-full h-full">
            <div className="mx-auto grid sm:w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Bem vindo!</h1>
                    <p className="text-balance text-muted-foreground">
                        Insira seus dados para realizar o acesso.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="exemplo@bluebear.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Insira sua senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SubmitButton loading={loading} title="Login" />
                        <Button disabled className="w-full">
                            Entrar com Google
                        </Button>
                    </form>
                </Form>
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
