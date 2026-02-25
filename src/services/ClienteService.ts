import type { Cliente, OficinaData } from './types';
import { Validators } from './validators';

export class ClienteService {
  constructor(private data: OficinaData, private saveDataCallback: () => Promise<void>) {}

  async add(cliente: Cliente): Promise<number> {
    Validators.validateCliente(cliente);
    
    const clienteExistente = this.data.clientes.find(
      c => c.email === cliente.email || c.telefone === cliente.telefone
    );
    if (clienteExistente) {
      throw new Error('Já existe um cliente com este email ou telefone');
    }
    
    const id = Math.max(0, ...this.data.clientes.map(c => c.id || 0)) + 1;
    cliente.id = id;
    this.data.clientes.push({ ...cliente });
    await this.saveDataCallback();
    return id;
  }

  async getAll(): Promise<Cliente[]> {
    return this.data.clientes;
  }

  async getById(id: number): Promise<Cliente | undefined> {
    return this.data.clientes.find(c => c.id === id);
  }

  async update(cliente: Cliente): Promise<void> {
    if (!cliente.id) throw new Error('ID do cliente não fornecido');
    
    Validators.validateCliente(cliente);
    
    const index = this.data.clientes.findIndex(c => c.id === cliente.id);
    if (index === -1) throw new Error('Cliente não encontrado');
    
    // Verifica se email/telefone não conflitam com outros clientes
    const clienteExistente = this.data.clientes.find(
      c => (c.email === cliente.email || c.telefone === cliente.telefone) && c.id !== cliente.id
    );
    if (clienteExistente) {
      throw new Error('Já existe outro cliente com este email ou telefone');
    }
    
    this.data.clientes[index] = { ...cliente };
    await this.saveDataCallback();
  }

  async delete(id: number): Promise<void> {
    const veiculosAssociados = this.data.veiculos.some(v => v.clienteId === id);
    if (veiculosAssociados) {
      throw new Error('Não é possível excluir o cliente pois existem veículos associados a ele');
    }

    this.data.clientes = this.data.clientes.filter(c => c.id !== id);
    await this.saveDataCallback();
  }

  async search(termo: string): Promise<Cliente[]> {
    const termoLower = termo.toLowerCase();
    return this.data.clientes.filter(c => 
      c.nome.toLowerCase().includes(termoLower) ||
      c.email.toLowerCase().includes(termoLower) ||
      c.telefone.includes(termo)
    );
  }
}
