"use client";

import { links } from "@/app/core/types/LinkItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STUDENT_ROLE } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function QuickAccessCard() {
    const { data: session }: any = useSession();

    return (
        <Card className="sm:col-span-2 order-1 sm:order-5">
            <CardHeader>
                <CardTitle>Acesso rápido</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3 justify-center">
                {links.map(({ href, title, icon, adminOnly, studentOnly }) => {
                    if (adminOnly && session.user?.role !== 'admin') return null;
                    if (studentOnly && session.user?.role !== STUDENT_ROLE) return null;
                    return (
                        <Button variant={"link"} className="flex items-center justify-start gap-2 text-stone-700 dark:text-stone-200">
                            {icon}
                            <Link href={href}>{title}</Link>
                        </Button>
                    );
                })}
            </CardContent>
        </Card>
    );
}
