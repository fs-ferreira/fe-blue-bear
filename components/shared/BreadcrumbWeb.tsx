'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useSession } from 'next-auth/react';

const isUUID = (segment: string) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(segment);
};

const formatBreadcrumb = (segment: string) => {
    return segment.charAt(0).toUpperCase() + segment.slice(1).replaceAll('-', ' ');
};

export function BreadcrumbWeb() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    const blockedUrls = ['requerimento', 'pagamento'];

    const { data: session }: any = useSession();

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
                    const isUUIDSegment = isUUID(segment);
                    const isBlocked = blockedUrls.includes(segment) && session?.user?.role !== 'admin';

                    if (segment == 'main') {
                        return null;
                    }

                    const penultimateSegment = segments[index - 1];
                    const isPenultimateSalas = penultimateSegment === 'salas' && isUUIDSegment;

                    return (
                        <div key={href} className="flex items-center">
                            {isLast && isUUIDSegment ? (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {isPenultimateSalas ? 'Sala de aula' : `Alterar`}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : isLast ? (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{formatBreadcrumb(segment)}</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                <>
                                    <BreadcrumbItem>
                                        {isBlocked ? (
                                            <BreadcrumbItem>
                                                <BreadcrumbPage className='text-muted-foreground'>{formatBreadcrumb(segment)}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        ) : (
                                            <Link href={href} passHref legacyBehavior>
                                                <BreadcrumbLink>{formatBreadcrumb(segment)}</BreadcrumbLink>
                                            </Link>
                                        )}
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
