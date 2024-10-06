"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { BreadcrumbWeb } from "./BreadcrumbWeb";
import { ModeToggle } from "./ModeToggle";
import { UserMenuToggle } from "./UserMenuToggle";


export default function Navbar() {

    return (
        <div className="flex  sm:ml-14">
            <nav className="flex items-center justify-between p-4 w-full">
                <BreadcrumbWeb />
                <div className="flex gap-2 items-center justify-center">
                    <div className="hidden md:block relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Pesquisar..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                    <ModeToggle />
                    <UserMenuToggle />

                </div>

            </nav>
        </div>
    );
}
