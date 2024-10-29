'use client';

import whiteBear from '@/public/images/white-bear.svg';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TooltipLink from '../sidebar/TooltipLink';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { STUDENT_ROLE } from '@/lib/utils';
import { links } from '@/app/core/types/LinkItem';
import { Settings } from 'lucide-react';

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
                    {links.map(({ href, title, icon, adminOnly, studentOnly }) => {
                        if (adminOnly && session.user?.role !== 'admin') return null;
                        if (studentOnly && session.user?.role !== STUDENT_ROLE) return null;
                        return (
                            <TooltipLink
                                key={href}
                                href={href}
                                icon={icon}
                                name={title}
                                tooltipContent={title}
                                isActive={pathname === href}
                            />
                        );
                    })}
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
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
