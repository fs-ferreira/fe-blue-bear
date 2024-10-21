"use client"

import { PaymentService } from "@/app/core/services/payment.service"
import { Button } from "@/components/ui/button"
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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DatePicker } from "../shared/DatePicker"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import { useState } from "react"
import { Loader } from "lucide-react"

const createPaymentSchema = () => {
    return z.object({
        studentRa: z.string().min(8, "Nome precisa conter 8 dígitos").max(8).trim(),
        dueDate: z.date({ required_error: "Data obrigatória" })
    });
};

interface PaymentSheetProps {
    isOpen: boolean;
    onClose: (reloadPayments: boolean) => void;
}


export default function PaymentSheet({ isOpen, onClose }: PaymentSheetProps) {
    const { data: session } = useSession();
    const paymentService = new PaymentService(session);
    const [loading, setLoading] = useState<boolean>(false)
    const formSchema = createPaymentSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentRa: "",
            dueDate: undefined
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        let result: any;

        result = await paymentService.createPayment(values);
        setLoading(false)
        if (!result) {
            form.reset();
            return
        }
        onClose(true);
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                    <SheetTitle>Pagamento</SheetTitle>
                    <SheetDescription>
                        Crie um novo pagamento.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
                        <FormField
                            control={form.control}
                            name="studentRa"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RA do aluno</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Registro acadêmico de 8 dígitos" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de pagamento</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            onDateSelect={field.onChange}
                                            value={field.value ? new Date(field.value) : undefined}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetFooter>
                            <Button type="submit" disabled={loading}>{loading ? <Loader className="animate-spin" /> : 'Salvar'}</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
