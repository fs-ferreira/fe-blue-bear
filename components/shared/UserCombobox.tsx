"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { User } from "@/app/core/entities/user/user"
import { UserService } from "@/app/core/services/user.service"

interface UserComboboxProps {
    onUserSelect: (user: User | null) => void;
    userId?: string;
}

export function UserCombobox({ onUserSelect, userId }: UserComboboxProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>("");
    const { data: session }: any = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const userService = new UserService(session);
    const [reload, setReload] = useState(true);

    const fetchUsers = async () => {
        const users = await userService.findAll();
        setUsers(users);
        setReload(false)
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            return;
        }
        if (session && reload) {
            fetchUsers();
        }
    }, [session]);

    useEffect(() => {
        if (userId && users.length > 0) {
            const user = users.find((user) => user.id === userId);
            if (user) {
                setValue(user.fullName);
            } else {
                setValue("");
            }
        }
    }, [userId, users]);

    const handleSelect = (currentValue: string) => {
        console.warn(currentValue);
        if (currentValue === value) {
            setValue("");
            onUserSelect(null);
        } else {
            const selectedUser = users.find((user) => user.fullName.trim() === currentValue.trim()) || null;
            console.warn(users);
            
            setValue(currentValue);
            onUserSelect(selectedUser);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between ${value === '' ? 'text-muted-foreground' : ''}`}
                >
                    <span className="max-w-[95%] text-nowrap overflow-hidden overflow-ellipsis">
                        {value || "Selecionar usuário..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-1 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] pointer-events-auto">
                <Command>
                    <CommandInput placeholder="Procurar usuário..." />
                    <CommandList>
                        <CommandEmpty>Nenhum usuário encontrado</CommandEmpty>
                        <CommandGroup>
                            {users.map((user) => (
                                <CommandItem
                                    key={user.id}
                                    value={user.fullName}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === user.fullName ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {user.fullName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
