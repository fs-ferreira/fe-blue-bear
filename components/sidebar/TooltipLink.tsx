// components/TooltipLink.tsx

import React, { ReactElement } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Link from 'next/link';

interface TooltipLinkProps {
    href: string;
    icon: ReactElement;
    name: string;
    tooltipContent: string;
    isActive?: boolean;
}

const TooltipLink: React.FC<TooltipLinkProps> = ({ href, icon, name, tooltipContent, isActive }) => {
    const iconClass = "h-5 w-5";
    const activeClass = isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground';

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${activeClass}`}
                >
                    {React.cloneElement(icon, { className: iconClass })}
                    <span className="sr-only">{name}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{tooltipContent}</TooltipContent>
        </Tooltip>
    );
};

export default TooltipLink;
