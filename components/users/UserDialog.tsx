"use client"

import { Role } from "@/app/core/entities/roles/role"
import { User } from "@/app/core/entities/users/user"
import { RoleService } from "@/app/core/services/roleService"
import { UserService } from "@/app/core/services/userService"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const createUserSchema = (userExists: boolean) => {
    const baseSchema = z.object({
        fullName: z.string().min(10, "Nome precisa conter, no mínimo, 10 caracteres!").max(50),
        email: z.string().email("Email inválido!"),
        roleId: z.string().uuid("Cargo inválido"),
        password: z.string().min(6, "Senha precisa conter, no mínimo, 6 caracteres!")
    });

    if (userExists) {
        return baseSchema.extend({
            newPassword: z.string().min(6, "Senha precisa conter, no mínimo, 6 caracteres!"),
            confirmPassword: z.string().min(6, "Senha precisa conter, no mínimo, 6 caracteres!")
        }).superRefine(({ confirmPassword, newPassword }, ctx) => {
            if (confirmPassword !== newPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: "As senhas não coincidem!",
                    path: ['confirmPassword']
                });
            }
        });
    } else {
        return baseSchema;
    }
};

interface UserDialogProps {
    isOpen: boolean;
    onClose: (reloadUsers: boolean) => void;
    user?: User | null;
}


export default function UserDialog({ isOpen, onClose, user }: UserDialogProps) {
    const { data: session } = useSession();
    const [roles, setRoles] = useState<Role[]>([]);
    const userService = new UserService(session);
    const roleService = new RoleService(session);

    function fillForm(): void {
        if (user) {
            form.setValue("fullName", user.fullName)
            form.setValue("email", user.email)
            form.setValue("roleId", roles.find(el => el.name === user.roleName)?.id || '')
        }
    }

    useEffect(() => {
        const fetchRoles = async () => {
            const roles = await roleService.findAll();
            setRoles(roles);
        };
        if (session) {
            fetchRoles()
        }
    }, [session]);

    useEffect(() => {
        if (roles.length) {
            fillForm();
        }
    }, [roles]);

    const formSchema = createUserSchema(!!user);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            newPassword: "",
            confirmPassword: "",
            roleId: ""
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let result: any;
        if (user) {
            result = await userService.changePassword({
                email: values.email,
                password: values.password,
                newPassword: (values as any).newPassword,
            });
        } else {
            result = await userService.registerUser(values);
        }
        if (!result) {
            form.reset();
            fillForm()
            return
        }
        onClose(true);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Usuário</DialogTitle>
                        <DialogDescription>
                            Crie ou altere um usuário.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome completo</FormLabel>
                                    <FormControl>
                                        <Input disabled={!!user} placeholder="Fulano da Silva" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={!!user} placeholder="exemplo@bluebear.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Insira sua senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {user &&
                            <>
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nova senha</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Sua nova senha" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirmar senha</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirme sua senha" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        }

                        <FormField
                            control={form.control}
                            name="roleId"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cargo</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} defaultValue="" disabled={!!user}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um cargo" className="placeholder:text-muted" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    roles.map(role => <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
