'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

const formatBreadcrumb = (segment: string) => {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
};

export function BreadcrumbWeb() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);


    if (pathname === '/' || pathname === '/main') {
        return <div></div>;
    }

    return (
        <Breadcrumb className="block">
            <BreadcrumbList>
                {/* Item Home */}
                <BreadcrumbItem>
                    <Link href="/main" passHref legacyBehavior>
                        <BreadcrumbLink className='font-semibold'>Home</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                {/* Separador entre os itens */}
                <BreadcrumbSeparator />

                {/* Mapeia os segmentos da URL para criar os itens dinamicamente */}
                {segments.map((segment, index) => {

                    const href = '/' + segments.slice(0, index + 1).join('/');

                    const isLast = index === segments.length - 1;

                    if (segment == 'main') {
                        return null;
                    }

                    return (
                        <div key={href} className="flex items-center">
                            {isLast ? (

                                <BreadcrumbItem>
                                    <BreadcrumbPage>{formatBreadcrumb(segment)}</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                <>
                                    <BreadcrumbItem>
                                        <Link href={href} passHref legacyBehavior>
                                            <BreadcrumbLink>{formatBreadcrumb(segment)}</BreadcrumbLink>
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </>
                            )}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
