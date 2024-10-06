"use client"
    ;
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Navbar from "@/components/shared/Navbar";
import { Sidebar } from "@/components/shared/Sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <ProtectedRoute>
            <header>
                <Navbar />
            </header>
            <Sidebar />
            <div className="sm:ml-14">
                <div className="px-4 md:px-10">
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    );
}
