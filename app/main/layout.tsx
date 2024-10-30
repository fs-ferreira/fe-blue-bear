"use client"
    ;
import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Navbar from "@/components/shared/Navbar";
import { Sidebar } from "@/components/shared/Sidebar";
import Loading from "./loading";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <ProtectedRoute>
            <header>
                <Navbar />
            </header>
            <Sidebar />
            <div className="sm:ml-14">
                <div className="px-4 md:px-10">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </ProtectedRoute>
    );
}
