'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
                        <CardTitle>Sobre o Blue Bear</CardTitle>
                        <CardDescription>SaaS Acadêmico para Universidades</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 font-light text-justify">
                        <p>Blue Bear é uma solução SaaS acadêmica inovadora, projetada para universidades que buscam modernizar e otimizar seus sistemas educacionais. Desenvolvido com uma tecnologia robusta, utilizando Next.js 14, ShadCN, Java Spring Boot e PostgreSQL, o Blue Bear oferece uma plataforma escalável, eficiente e confortável para atender às necessidades de instituições de ensino superior.</p>
                        <p>Seu objetivo é revolucionar a gestão acadêmica, proporcionando uma experiência moderna e eficaz para administradores, professores e alunos. Com foco na usabilidade e na performance, o Blue Bear possibilita uma navegação intuitiva e fluida, garantindo que todas as funcionalidades sejam acessíveis e fáceis de utilizar, independentemente do nível técnico dos usuários.</p>
                        <p>A plataforma é altamente escalável, suportando o crescimento e expansão de universidades, enquanto se adapta a diferentes demandas e processos institucionais. Com segurança e flexibilidade integradas, o Blue Bear se destaca como uma solução ideal para transformar o ambiente educacional digital.</p>

                    </CardContent>
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
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Acesso rápido</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant={"link"}>
                            <Link href="#" className="">Teste</Link>
                        </Button>

                    </CardContent>
                </Card>
            </div>


        </div >
    );
};

