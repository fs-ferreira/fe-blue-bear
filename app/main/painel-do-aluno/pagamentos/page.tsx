"use client";
import { PaymentSummary } from "@/app/core/entities/payment/paymentSummary";
import { paymentSummaryColumns } from "@/app/core/entities/payment/paymentSummaryColumns";
import { PaymentService } from "@/app/core/services/payment.service";
import { DataTable } from "@/components/shared/DataTable";
import { STUDENT_ROLE } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StudentPaymentsPage() {
    const { data: session }: any = useSession();
    const [payments, setPayments] = useState<PaymentSummary[]>([]);
    const [reloadPayment, setReloadPayment] = useState(true);

    const paymentService = new PaymentService(session);

    const fetchPayments = async (email: string) => {
        const response = await paymentService.findAllByStudentEmail(email);
        setReloadPayment(false)
        if (!response) return;
        setPayments(response)
    };


    useEffect(() => {
        if (!session) return;

        if (session.user.role === STUDENT_ROLE && reloadPayment) {
            fetchPayments(session.user.email);
        }
    }, [session, reloadPayment]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl">Histórico de faturas</h1>
                {/* <Button variant={"outline"}><FileText /></Button> */}
            </div>
            <DataTable columns={paymentSummaryColumns()} data={payments} loading={reloadPayment} />
        </div>
    )
}