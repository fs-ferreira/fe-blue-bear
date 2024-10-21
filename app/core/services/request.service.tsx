import { toast } from 'sonner';
import { BaseService } from './base.service';
import { Request } from '../entities/request/request';
import { FND_EDU_URL, getBaseHeaders } from '@/lib/utils';
import { RequestPayload } from '../entities/request/createRequest';


export class RequestService extends BaseService<Request> {
  constructor(session: any) {
    super(FND_EDU_URL || '', 'requests', 'requerimento', session);
  }

  async findByProtocolNumber(protocolNumber: string): Promise<Request | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/protocol/${protocolNumber}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar o requerimento pelo número de protocolo. ${error.detail}`);
        return null;
      }
    } catch (error) {
      toast.error(`Erro ao buscar a solicitação pelo número de protocolo: ${error}`);
      return null;
    }
  }

  async findAllByStudentEmail(email: string): Promise<Request[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/student/email/${email}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao buscar os requerimentos do aluno. ${error.detail}`);
        return [];
      }
    } catch (error) {
      toast.error(`Erro ao buscar os requerimentos do aluno: ${error}`);
      return [];
    }
  }

  async saveRequest(data: RequestPayload): Promise<Request | null> {
    const response = await fetch(`${this.baseUrl}/${this.entity}`, {
      method: 'POST',
      headers: getBaseHeaders(this.session),
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(`${this.capitalizeFirstLetter(this.displayName)} criado com sucesso!`);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return null;
      }
    } else {
      const error = await response.json();
      toast.error(`${error.status} - Erro ao criar ${this.displayName}. ${error.detail}`);
    }

    return null;
  }

  async updateRequest(data: RequestPayload): Promise<Request | null> {
    const response = await fetch(`${this.baseUrl}/${this.entity}`, {
      method: 'PUT',
      headers: getBaseHeaders(this.session),
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(`${this.capitalizeFirstLetter(this.displayName)} alterado com sucesso!`);
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return null;
      }
    } else {
      const error = await response.json();
      toast.error(`${error.status} - Erro ao alterar ${this.displayName}. ${error.detail}`);
    }

    return null;
  }
}
