'use client';

import AboutCard from "@/components/main/AboutCard";
import ImportantDatesCard from "@/components/main/ImportantDatesCard";
import NoticeBoardCard from "@/components/main/NoticeBoardCard";
import QuickAccessCard from "@/components/main/QuickAccessCard";
import { useSession } from "next-auth/react";

export default function HomePage() {
    const { data: session }: any = useSession();

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[55%_45%] lg:grid-cols-[70%_30%] gap-10 pr-4">
            <AboutCard />
            <NoticeBoardCard />
            <ImportantDatesCard />
            <QuickAccessCard />
        </div>
    );
}
