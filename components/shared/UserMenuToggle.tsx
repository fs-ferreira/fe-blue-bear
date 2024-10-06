"use client"

import * as React from "react"
import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRound } from "lucide-react"
import { signOut } from "next-auth/react"
import { permissionService } from "@/app/core/services/permissionService"
import { handleLogout } from "@/lib/utils"

export function UserMenuToggle() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <UserRound />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sua conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Suporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="hover:cursor-pointer">
                    <div className="flex items-center gap-1 w-full">
                        <ExitIcon className="scale-x-[-1]" />
                        <span>Encerrar</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
