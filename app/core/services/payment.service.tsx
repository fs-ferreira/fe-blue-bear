import { FND_EDU_URL, getBaseHeaders } from '@/lib/utils';
import { toast } from 'sonner';
import { Payment } from '../entities/payment/payment';
import { PaymentSummary } from '../entities/payment/paymentSummary';
import { BaseService } from './base.service';
import { CreatePayment } from '../entities/payment/createPayment';


export class PaymentService extends BaseService<Payment> {
    constructor(session: any) {
        super(FND_EDU_URL || '', 'payments', 'pagamento', session);
    }

    async findAllSummarized(): Promise<PaymentSummary[]> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao buscar todos os pagamentos. ${error.detail}`);
                return [];
            }
        } catch (error) {
            toast.error(`Erro ao buscar todos os pagamentos: ${error}`);
            return [];
        }
    }

    async findAllByStudentRa(ra: string): Promise<PaymentSummary[]> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/student/${ra}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao buscar os pagamentos do aluno. ${error.detail}`);
                return [];
            }
        } catch (error) {
            toast.error(`Erro ao buscar os pagamentos do aluno: ${error}`);
            return [];
        }
    }

    async findAllByStudentEmail(email: string): Promise<PaymentSummary[]> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/student/email/${email}`, {
                method: 'GET',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao buscar os pagamentos do aluno. ${error.detail}`);
                return [];
            }
        } catch (error) {
            toast.error(`Erro ao buscar os pagamentos do aluno: ${error}`);
            return [];
        }
    }

    async checkPaymentPaid(id: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/check/${id}`, {
                method: 'PUT',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao verificar o pagamento. ${error.detail}`);
                return false;
            }
        } catch (error) {
            toast.error(`Erro ao verificar o pagamento: ${error}`);
            return false;
        }
    }

    async completePayment(id: string): Promise<Payment | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}/${id}`, {
                method: 'PUT',
                headers: getBaseHeaders(this.session),
            });

            if (response.ok) {
                toast.success('Pagamento confirmado com sucesso! Por favor, atualize o status do mesmo.');
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao completar o pagamento. ${error.detail}`);
                return null;
            }
        } catch (error) {
            toast.error(`Erro ao completar o pagamento: ${error}`);
            return null;
        }
    }

    async createPayment(data: CreatePayment): Promise<Payment | null> {
        try {
            const response = await fetch(`${this.baseUrl}/${this.entity}`, {
                method: 'POST',
                headers: getBaseHeaders(this.session),
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success('Pagamento criado com sucesso!');
                return await response.json();
            } else {
                const error = await response.json();
                toast.error(`${error.status} - Erro ao criar o pagamento. ${error.detail}`);
                return null;
            }
        } catch (error) {
            toast.error(`Erro ao criar o pagamento: ${error}`);
            return null;
        }
    }
}
