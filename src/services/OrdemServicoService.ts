import type { OrdemServico, ItemOrdemServico, OficinaData } from './types';

export class OrdemServicoService {
  constructor(
    private data: OficinaData, 
    private saveDataCallback: () => Promise<void>,
    private pecaService: any // Será injetado pela classe principal
  ) {}

  async add(ordemServico: OrdemServico): Promise<number> {
    await this.validarEstoqueItens(ordemServico.itens);
    
    const id = Math.max(0, ...this.data.ordensServico.map(os => os.id || 0)) + 1;
    const ano = new Date().getFullYear();
    const ultimaOS = this.data.ordensServico.sort((a, b) => b.numero.localeCompare(a.numero))[0];
    const sequencial = ultimaOS ? parseInt(ultimaOS.numero.split('-')[2]) + 1 : 1;
    
    ordemServico.id = id;
    ordemServico.numero = `OS-${ano}-${String(sequencial).padStart(4, '0')}`;
    
    // Atualiza estoque das peças
    for (const item of ordemServico.itens) {
      if (item.tipo === 'peca') {
        await this.pecaService.atualizarEstoque(item.itemId, item.quantidade, 'subtrair');
      }
    }
    
    this.data.ordensServico.push({ ...ordemServico });
    
    // Adiciona itens
    ordemServico.itens.forEach(item => {
      const itemId = Math.max(0, ...this.data.itensOrdemServico.map(i => i.id || 0)) + 1;
      item.id = itemId;
      item.ordemServicoId = id;
      this.data.itensOrdemServico.push({ ...item });
    });
    
    await this.saveDataCallback();
    return id;
  }

  async getAll(): Promise<OrdemServico[]> {
    return this.data.ordensServico.map(os => ({
      ...os,
      itens: this.data.itensOrdemServico.filter(item => item.ordemServicoId === os.id)
    }));
  }

  async getById(id: number): Promise<OrdemServico | undefined> {
    const os = this.data.ordensServico.find(os => os.id === id);
    if (!os) return undefined;
    
    return {
      ...os,
      itens: this.data.itensOrdemServico.filter(item => item.ordemServicoId === id)
    };
  }

  async getByStatus(status: 'aberta' | 'em_andamento' | 'concluida' | 'cancelada'): Promise<OrdemServico[]> {
    return this.data.ordensServico
      .filter(os => os.status === status)
      .map(os => ({
        ...os,
        itens: this.data.itensOrdemServico.filter(item => item.ordemServicoId === os.id)
      }));
  }

  async getByVeiculo(veiculoId: number): Promise<OrdemServico[]> {
    return this.data.ordensServico
      .filter(os => os.veiculoId === veiculoId)
      .map(os => ({
        ...os,
        itens: this.data.itensOrdemServico.filter(item => item.ordemServicoId === os.id)
      }));
  }

  async update(ordemServico: OrdemServico): Promise<void> {
    if (!ordemServico.id) throw new Error('ID da ordem de serviço não fornecido');

    const index = this.data.ordensServico.findIndex(os => os.id === ordemServico.id);
    if (index === -1) throw new Error('Ordem de serviço não encontrada');

    // Restaura estoque dos itens antigos
    const itensAntigos = this.data.itensOrdemServico.filter(
      item => item.ordemServicoId === ordemServico.id
    );

    for (const itemAntigo of itensAntigos) {
      if (itemAntigo.tipo === 'peca') {
        await this.pecaService.atualizarEstoque(itemAntigo.itemId, itemAntigo.quantidade, 'adicionar');
      }
    }

    // Valida e atualiza estoque com novos itens
    await this.validarEstoqueItens(ordemServico.itens);

    for (const item of ordemServico.itens) {
      if (item.tipo === 'peca') {
        await this.pecaService.atualizarEstoque(item.itemId, item.quantidade, 'subtrair');
      }
    }

    // Remove itens antigos
    this.data.itensOrdemServico = this.data.itensOrdemServico.filter(
      item => item.ordemServicoId !== ordemServico.id
    );

    // Adiciona novos itens
    ordemServico.itens.forEach(item => {
      const itemId = Math.max(0, ...this.data.itensOrdemServico.map(i => i.id || 0)) + 1;
      item.id = itemId;
      item.ordemServicoId = ordemServico.id!;
      this.data.itensOrdemServico.push({ ...item });
    });

    this.data.ordensServico[index] = { ...ordemServico };
    await this.saveDataCallback();
  }

  async delete(id: number): Promise<void> {
    const index = this.data.ordensServico.findIndex(os => os.id === id);
    if (index === -1) throw new Error('Ordem de serviço não encontrada');

    // Restaura estoque das peças
    const itens = this.data.itensOrdemServico.filter(item => item.ordemServicoId === id);
    for (const item of itens) {
      if (item.tipo === 'peca') {
        await this.pecaService.atualizarEstoque(item.itemId, item.quantidade, 'adicionar');
      }
    }

    // Remove itens e ordem
    this.data.itensOrdemServico = this.data.itensOrdemServico.filter(
      item => item.ordemServicoId !== id
    );

    this.data.ordensServico.splice(index, 1);
    await this.saveDataCallback();
  }

  private async validarEstoqueItens(itens: ItemOrdemServico[]): Promise<void> {
    for (const item of itens) {
      if (item.tipo === 'peca') {
        const peca = this.data.pecas.find(p => p.id === item.itemId);
        if (!peca) {
          throw new Error(`Peça com ID ${item.itemId} não encontrada`);
        }
        if (peca.quantidadeEstoque < item.quantidade) {
          throw new Error(`Estoque insuficiente para a peça ${peca.nome}. Disponível: ${peca.quantidadeEstoque}, Necessário: ${item.quantidade}`);
        }
      }
    }
  }

  async search(termo: string): Promise<OrdemServico[]> {
    const termoLower = termo.toLowerCase();
    return this.data.ordensServico
      .filter(os => 
        os.numero.toLowerCase().includes(termoLower) ||
        (os.observacoes && os.observacoes.toLowerCase().includes(termoLower))
      )
      .map(os => ({
        ...os,
        itens: this.data.itensOrdemServico.filter(item => item.ordemServicoId === os.id)
      }));
  }
}
