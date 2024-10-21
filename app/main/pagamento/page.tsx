"use client";

import { PaymentSummary } from "@/app/core/entities/payment/paymentSummary";
import { PaymentService } from "@/app/core/services/payment.service";
import PaymentSheet from "@/components/payment/PaymentSheet";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"; // Para mostrar notificações
import { paymentColumns } from "@/app/core/entities/payment/paymentColumns";

interface DialogStateProps {
    isOpen: boolean;
}

const createFilterSchema = () => {
    return z.object({
        ra: z.string().min(8, 'Insira um valor de 8 dígitos').max(8, 'Insira um valor de 8 dígitos').trim().or(z.literal(''))
    });
};

export default function FinancialPage() {
    const { data: session }: any = useSession();
    const [payments, setPayments] = useState<PaymentSummary[]>([]);
    const [reloadPayments, setReloadPayments] = useState(true);
    const router = useRouter()
    const [filterActive, setFilterActive] = useState(false);

    const formSchema = createFilterSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ra: '',
        },
    });

    const paymentService = new PaymentService(session);
    const [dialogState, setDialogState] = useState<DialogStateProps>({ isOpen: false });

    const fetchPayments = async () => {
        const ra = form.getValues("ra");
        let payments: PaymentSummary[] = [];
        if (ra?.length === 8) {
            payments = await paymentService.findAllByStudentRa(ra);
            setFilterActive(true)
        } else {
            payments = await paymentService.findAllSummarized();
        }
        setPayments(payments);
        setReloadPayments(false)
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadPayments) {
            fetchPayments();
        }
    }, [session, reloadPayments]);

    const handleOpenDialog = () => {
        setDialogState({ isOpen: true });
    };

    const handleCloseDialog = (reload = false) => {
        setDialogState({ ...dialogState, isOpen: false });
        setReloadPayments(reload);
    };

    const handleClearFilter = () => {
        form.reset();
        setFilterActive(false);
        setReloadPayments(true);
    };

    const handleCheckPayment = async (payment: PaymentSummary) => {
        const result = await paymentService.checkPaymentPaid(payment.id);

        result ? toast.info("Pagamento realizado! Atualizando dados...") : toast.warning("Pagamento ainda não pago!")
        setReloadPayments(true);
    };

    const handleConfirmPayment = async (payment: PaymentSummary) => {
       await paymentService.completePayment(payment.id);
    };

    return (
        <PageLayout title="Financeiro">
            {dialogState.isOpen && (
                <PaymentSheet isOpen={dialogState.isOpen} onClose={handleCloseDialog} />
            )}
            <div className="flex-col items-end sm:flex-row flex sm:justify-between p-6 gap-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => setReloadPayments(true))} className="w-full grid sm:grid-cols-2 gap-2 items-start">
                        <FormField
                            control={form.control}
                            name="ra"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Pesquise pelo RA do aluno" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between gap-2 w-full">
                            <div className="flex gap-2">
                                <Button variant={"outline"} className="w-12" type="submit"><Search /></Button>
                                <Button disabled={!filterActive} variant={"outline"} type="submit" onClick={handleClearFilter}>Limpar Filtro</Button>
                            </div>
                            <Button variant={"outline"} className="w-12" onClick={handleOpenDialog}><PlusIcon /></Button>
                        </div>
                    </form>
                </Form>
            </div>
            <CardContent>
                <DataTable
                    columns={paymentColumns({ checkPaymentFn: handleCheckPayment, confirmPaymentFn: handleConfirmPayment })}
                    data={payments}
                />
            </CardContent>
        </PageLayout>
    );
}
