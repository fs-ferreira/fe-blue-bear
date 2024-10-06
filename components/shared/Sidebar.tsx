'use client';

import { Home, LineChart, Package, Settings, ShoppingCart, Users2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import whiteBear from '@/public/images/white-bear.svg'

export const Sidebar = () => {
    const pathname = usePathname();

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
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/main"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/main' ? 'bg-accent text-accent-foreground' : ''
                                    }`}
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Painel</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Painel</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/main/users"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/main/users' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                <Users2 className="h-5 w-5" />
                                <span className="sr-only">Usuários</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Usuários</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/orders' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Orders</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Orders</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/products' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                <Package className="h-5 w-5" />
                                <span className="sr-only">Products</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Products</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/analytics' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                <LineChart className="h-5 w-5" />
                                <span className="sr-only">Analytics</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Analytics</TooltipContent>
                    </Tooltip>
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
