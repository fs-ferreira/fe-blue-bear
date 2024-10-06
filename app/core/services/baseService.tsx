import { getBaseHeaders } from "@/lib/utils";
import { toast } from "sonner";

export class BaseService<T> {
  baseUrl: string;
  entity: string;
  displayName: string;
  session: any;

  constructor(baseUrl: string, entity: string, displayName: string, session: any) {
    this.baseUrl = baseUrl;
    this.entity = entity;
    this.displayName = displayName;
    this.session = session;
  }

  async findAll(): Promise<T[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao obter ${this.displayName}. ${error.detail}`);
        return [];
      }
    } catch (error) {
      toast.error(`Erro ao buscar ${this.displayName}: ${error}`);
      return [];
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/${id}`, {
        method: 'GET',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao obter ${this.displayName}. ${error.detail}`);
      }
    } catch (error) {
      toast.error(`Erro ao buscar ${this.displayName}: ${error}`);
    }
    return null;
  }

  async save(data: T): Promise<T | null> {
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

  async update(id: string, data: T): Promise<T | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/${id}`, {
        method: 'PUT',
        headers: getBaseHeaders(this.session),
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(`${this.capitalizeFirstLetter(this.displayName)} atualizado com sucesso!`);
        return await response.json();
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao atualizar ${this.displayName}. ${error.detail}`);
      }
    } catch (error) {
      toast.error(`Erro ao atualizar ${this.displayName}: ${error}`);
    }
    return null;
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}/${id}`, {
        method: 'DELETE',
        headers: getBaseHeaders(this.session),
      });

      if (response.ok) {
        toast.success(`${this.capitalizeFirstLetter(this.displayName)} excluído com sucesso!`);
        return true;
      } else {
        const error = await response.json();
        toast.error(`${error.status} - Erro ao excluir ${this.displayName}. ${error.detail}`);
      }
    } catch (error) {
      toast.error(`Erro ao excluir ${this.displayName}: ${error}`);
    }
    return false;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
