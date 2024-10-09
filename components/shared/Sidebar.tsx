'use client';

import { Archive, CreditCard, GraduationCap, Home, LineChart, Package, School, Settings, ShoppingCart, SquareLibrary, SquareUser, University, Users2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import whiteBear from '@/public/images/white-bear.svg'
import { useSession } from 'next-auth/react';
import TooltipLink from '../sidebar/TooltipLink';

export const Sidebar = () => {
    const pathname = usePathname();
    const { data: session }: any = useSession();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Image src={whiteBear} width={20} height={20} alt='Blue Bear' className="transition-all group-hover:scale-110 fill-slate-50" />
                </Link>
                <TooltipProvider>
                    <TooltipLink
                        href="/main"
                        icon={<Home />}
                        name="Painel"
                        tooltipContent="Painel"
                        isActive={pathname === '/main'}
                    />
                    {
                        session.user?.role === 'admin' ?
                            <>
                                <TooltipLink
                                    href="/main/users"
                                    icon={<Users2 />}
                                    name="Usuários"
                                    tooltipContent="Usuários"
                                    isActive={pathname === '/main/users'}
                                />
                                <TooltipLink
                                    href="/main/cursos"
                                    icon={<SquareLibrary />}
                                    name="Cursos"
                                    tooltipContent="Cursos"
                                    isActive={pathname === '/main/cursos'}
                                />
                                <TooltipLink
                                    href="/main/aluno"
                                    icon={<SquareUser />}
                                    name="Alunos"
                                    tooltipContent="Alunos"
                                    isActive={pathname === '/main/aluno'}
                                />
                            </>

                            : null
                    }

                    <TooltipLink
                        href="/main/area-aluno"
                        icon={<GraduationCap />}
                        name="Área do Aluno"
                        tooltipContent="Área do Aluno"
                        isActive={pathname === '/main/area-aluno'}
                    />
                    <TooltipLink
                        href="/main/salas"
                        icon={<School />}
                        name="Salas de Aula"
                        tooltipContent="Salas de Aula"
                        isActive={pathname === '/main/salas'}
                    />
                     <TooltipLink
                        href="/main/pagamento"
                        icon={<CreditCard />}
                        name="Financeiro"
                        tooltipContent="Financeiro"
                        isActive={pathname === '/main/pagamento'}
                    />
                          <TooltipLink
                        href="/main/requerimentos"
                        icon={<Archive />}
                        name="Requerimentos"
                        tooltipContent="Requerimentos"
                        isActive={pathname === '/main/requerimentos'}
                    />
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/settings"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/settings' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
};
