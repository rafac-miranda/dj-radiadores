import type { Servico, OficinaData } from './types';
import { Validators } from './validators';

export class ServicoService {
  constructor(private data: OficinaData, private saveDataCallback: () => Promise<void>) {}

  async add(servico: Servico): Promise<number> {
    Validators.validateServico(servico);

    const veiculoExiste = this.data.veiculos.some(v => v.id === servico.veiculoId);
    if (!veiculoExiste) {
      throw new Error('O veículo informado não existe');
    }

    const id = Math.max(0, ...this.data.servicos.map(s => s.id || 0)) + 1;
    servico.id = id;
    
    if (servico.data instanceof Date) {
      servico.data = servico.data.toISOString();
    }
    
    this.data.servicos.push({ ...servico });
    await this.saveDataCallback();
    return id;
  }

  async getAll(): Promise<Servico[]> {
    return this.data.servicos;
  }

  async getById(id: number): Promise<Servico | undefined> {
    return this.data.servicos.find(s => s.id === id);
  }

  async getByVeiculo(veiculoId: number): Promise<Servico[]> {
    return this.data.servicos.filter(s => s.veiculoId === veiculoId);
  }

  async getByStatus(status: 'pendente' | 'em_andamento' | 'concluido'): Promise<Servico[]> {
    return this.data.servicos.filter(s => s.status === status);
  }

  async update(servico: Servico): Promise<void> {
    if (!servico.id) throw new Error('ID do serviço não fornecido');
    
    Validators.validateServico(servico);
    
    const index = this.data.servicos.findIndex(s => s.id === servico.id);
    if (index === -1) throw new Error('Serviço não encontrado');
    
    if (servico.data instanceof Date) {
      servico.data = servico.data.toISOString();
    }
    
    this.data.servicos[index] = { ...servico };
    await this.saveDataCallback();
  }

  async delete(id: number): Promise<void> {
    const servicoEmUso = this.data.itensOrdemServico.some(item => 
      item.tipo === 'servico' && item.itemId === id
    );
    
    if (servicoEmUso) {
      throw new Error('Não é possível excluir o serviço pois ele está sendo usado em uma ou mais ordens de serviço');
    }

    this.data.servicos = this.data.servicos.filter(s => s.id !== id);
    await this.saveDataCallback();
  }

  async search(termo: string): Promise<Servico[]> {
    const termoLower = termo.toLowerCase();
    return this.data.servicos.filter(s => 
      s.descricao.toLowerCase().includes(termoLower)
    );
  }
}
