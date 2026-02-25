import type { Peca, StatusPeca, OficinaData } from './types';
import { Validators } from './validators';

export class PecaService {
  constructor(private data: OficinaData, private saveDataCallback: () => Promise<void>) {}

  async add(peca: Peca): Promise<number> {
    Validators.validatePeca(peca);

    const pecaExistente = this.data.pecas.find(p => p.codigo === peca.codigo);
    if (pecaExistente) {
      throw new Error('Já existe uma peça cadastrada com este código');
    }

    const id = Math.max(0, ...this.data.pecas.map(p => p.id || 0)) + 1;
    peca.id = id;
    peca.status = Validators.calcularStatusPeca(peca);
    
    this.data.pecas.push({ ...peca });
    await this.saveDataCallback();
    return id;
  }

  async getAll(): Promise<Peca[]> {
    return this.data.pecas;
  }

  async getById(id: number): Promise<Peca | undefined> {
    return this.data.pecas.find(p => p.id === id);
  }

  async getByCodigo(codigo: string): Promise<Peca | undefined> {
    return this.data.pecas.find(p => p.codigo === codigo);
  }

  async getByStatus(status: StatusPeca): Promise<Peca[]> {
    return this.data.pecas.filter(p => p.status === status);
  }

  async getPecasBaixoEstoque(): Promise<Peca[]> {
    return this.data.pecas.filter(p => p.status === 'baixo_estoque' || p.status === 'indisponivel');
  }

  async update(peca: Peca): Promise<void> {
    if (!peca.id) throw new Error('ID da peça não fornecido');
    
    Validators.validatePeca(peca);
    
    const index = this.data.pecas.findIndex(p => p.id === peca.id);
    if (index === -1) throw new Error('Peça não encontrada');
    
    const pecaExistente = this.data.pecas.find(p => p.codigo === peca.codigo && p.id !== peca.id);
    if (pecaExistente) {
      throw new Error('Já existe uma peça cadastrada com este código');
    }
    
    peca.status = Validators.calcularStatusPeca(peca);
    this.data.pecas[index] = { ...peca };
    await this.saveDataCallback();
  }

  async delete(id: number): Promise<void> {
    const pecaEmUso = this.data.itensOrdemServico.some(item => 
      item.tipo === 'peca' && item.itemId === id
    );
    
    if (pecaEmUso) {
      throw new Error('Não é possível excluir a peça pois ela está sendo usada em uma ou mais ordens de serviço');
    }

    this.data.pecas = this.data.pecas.filter(p => p.id !== id);
    await this.saveDataCallback();
  }

  async atualizarEstoque(pecaId: number, quantidade: number, operacao: 'adicionar' | 'subtrair'): Promise<void> {
    const index = this.data.pecas.findIndex(p => p.id === pecaId);
    if (index === -1) {
      throw new Error(`Peça com ID ${pecaId} não encontrada`);
    }

    const peca = this.data.pecas[index];
    
    if (operacao === 'subtrair') {
      if (peca.quantidadeEstoque < quantidade) {
        throw new Error(`Estoque insuficiente para a peça ${peca.nome}. Disponível: ${peca.quantidadeEstoque}, Necessário: ${quantidade}`);
      }
      peca.quantidadeEstoque -= quantidade;
    } else {
      peca.quantidadeEstoque += quantidade;
    }
    
    peca.status = Validators.calcularStatusPeca(peca);
    await this.saveDataCallback();
  }

  async search(termo: string): Promise<Peca[]> {
    const termoLower = termo.toLowerCase();
    return this.data.pecas.filter(p => 
      p.codigo.toLowerCase().includes(termoLower) ||
      p.nome.toLowerCase().includes(termoLower) ||
      (p.descricao && p.descricao.toLowerCase().includes(termoLower))
    );
  }
}
