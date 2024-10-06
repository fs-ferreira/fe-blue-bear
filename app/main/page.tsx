'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const { data: session, status }: any = useSession();
    const router = useRouter();

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold md:text-2xl">Painel</h1>
            <div className="grid  lg:grid-cols-[70%_30%] gap-10 lg:pr-10">
                <Card className="row-span-2">
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
                <Card className="">
                    <CardHeader>
                        <CardTitle>Mural de Avisos</CardTitle>
                        <CardDescription className="italic text-sm font-extralight">Últimas notícias da instituição.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Datas importantes</CardTitle>
                        <CardDescription className="italic text-sm font-extralight">
                            Próximas provas, entrega de atividades, etc...
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-3">
                        <div className="flex-1 flex items-center gap-4">
                            <div className="bg-muted size-12 text-center flex items-center justify-center border-2 border-primary">
                                <span className="font-mono font-bold text-lg leading-none text-primary tracking-tighter">
                                    26 <br /> SET
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold leading-none">Prova 01</p>
                                <p className="text-sm text-muted-foreground">Psicologia</p>
                            </div>
                            <div className="ml-auto">
                                <ChevronRight />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-muted size-12 text-center flex items-center justify-center border-2 border-primary">
                                <span className="font-mono font-bold text-lg leading-none text-primary tracking-tighter">
                                    22 <br /> SET
                                </span>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-sm font-semibold leading-none">Atividade matrizes</p>
                                <p className="text-sm text-muted-foreground">Cálculo II</p>
                            </div>
                            <div className="ml-auto">
                                <ChevronRight />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-muted size-12 text-center flex items-center justify-center border-2 border-primary">
                                <span className="font-mono font-bold text-lg leading-none text-primary tracking-tighter">
                                    20 <br /> SET
                                </span>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-sm font-semibold leading-none">Prova 02</p>
                                <p className="text-sm text-muted-foreground">Fenômenos de transporte</p>
                            </div>
                            <div className="ml-auto">
                                <ChevronRight />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <span className="text-muted-foreground hover:text-primary hover:cursor-pointer transition-all hover:scale-105">Ver mais</span>
                    </CardFooter>
                </Card>

                <p className="w-full text-wrap break-all">Seu token {session.accessToken}.</p>
                <h1>Bem-vindo à página protegida!</h1>
                <p>Você está autenticado como {session.user?.email}.</p>
            </div>


        </div >
    );
};

