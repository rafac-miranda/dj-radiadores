import type { Cliente, Veiculo, Servico, Peca, StatusPeca, OrdemServico, ItemOrdemServico, OficinaData } from './types';
import { Validators } from './validators';
import { ClienteService } from './ClienteService';
import { VeiculoService } from './VeiculoService';
import { ServicoService } from './ServicoService';
import { PecaService } from './PecaService';
import { OrdemServicoService } from './OrdemServicoService';

export class OficinaDB {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'oficinaMecanicaDB';
  private readonly version = 1;
  private initialized = false;
  private data: OficinaData = this.createDefaultData();

  // Serviços por componente - usando definite assignment assertion
  public clientes!: ClienteService;
  public veiculos!: VeiculoService;
  public servicos!: ServicoService;
  public pecas!: PecaService;
  public ordensServico!: OrdemServicoService;

  constructor() {
    this.inicializarServicos();
  }

  private inicializarServicos(): void {
    // Inicializa os serviços com referência aos dados e callback de salvamento
    this.clientes = new ClienteService(this.data, () => this.saveData());
    this.veiculos = new VeiculoService(this.data, () => this.saveData());
    this.servicos = new ServicoService(this.data, () => this.saveData());
    this.pecas = new PecaService(this.data, () => this.saveData());
    this.ordensServico = new OrdemServicoService(this.data, () => this.saveData(), this.pecas);
  }

  private createDefaultData(): OficinaData {
    return {
      clientes: [],
      veiculos: [],
      servicos: [],
      pecas: [],
      ordensServico: [],
      itensOrdemServico: [],
      metadata: {
        lastUpdate: new Date().toISOString()
      }
    };
  }

  // ===========================================
  // MÉTODOS DE INICIALIZAÇÃO E CONFIGURAÇÃO
  // ===========================================

  async init(): Promise<void> {
    if (this.initialized && this.db) return;
    this.initialized = false;
    this.db = null;

    return new Promise((resolve, reject) => {
      try {
        console.log('Iniciando conexão com o banco de dados...');
        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = () => {
          console.error('Erro ao abrir o banco de dados:', request.error);
          this.initialized = false;
          this.db = null;
          reject(request.error || new Error('Falha ao abrir o banco de dados'));
        };

        request.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          this.initialized = true;
          console.log('Banco de dados inicializado com sucesso');
          this.loadData().then(() => resolve());
        };

        request.onupgradeneeded = (event) => {
          console.log('Atualizando estrutura do banco de dados');
          const db = (event.target as IDBOpenDBRequest).result;

          if (db.objectStoreNames.contains('oficinaData')) {
            db.deleteObjectStore('oficinaData');
          }
          const store = db.createObjectStore('oficinaData', { keyPath: 'id' });
          store.add({ id: 'data', data: this.data });
          this.data = this.createDefaultData();
        };
      } catch (error) {
        console.error('Erro durante a inicialização do banco:', error);
        reject(error);
      }
    });
  }

  async reset(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    
    // Reseta os dados
    this.data = this.createDefaultData();
    this.initialized = false;

    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this.dbName);

      request.onerror = () => {
        console.error('Erro ao deletar banco de dados:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        console.log('Banco de dados deletado com sucesso');
        // Reinicializa os serviços com dados limpos
        this.inicializarServicos();
        this.init().then(resolve).catch(reject);
      };
    });
  }

  private async ensureConnection(): Promise<void> {
    if (!this.initialized || !this.db) {
      await this.init();
    }
  }

  // ===========================================
  // MÉTODOS DE BACKUP E RESTAURAÇÃO
  // ===========================================

  // Remover os métodos criarBackup e restaurarBackup que usavam criptografia

  // ===========================================
  // MÉTODOS DE DADOS (LOAD/SAVE)
  // ===========================================

  private async loadData(): Promise<void> {
    if (!this.db) throw new Error('Banco de dados não inicializado');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('oficinaData', 'readonly');
      const store = transaction.objectStore('oficinaData');
      const request = store.get('data');

      request.onsuccess = () => {
        if (request.result) {
          this.data = request.result.data;
          // Reinicializa os serviços após carregar dados
          this.inicializarServicos();
        }
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  private prepareDataForSave(): OficinaData {
    try {
      return JSON.parse(JSON.stringify(this.data));
    } catch (error) {
      console.error('Erro ao preparar dados para salvar:', error);
      throw new Error('Dados não podem ser serializados');
    }
  }

  private async saveData(): Promise<void> {
    if (!this.db) throw new Error('Banco de dados não inicializado');

    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction('oficinaData', 'readwrite');
        const store = transaction.objectStore('oficinaData');
        this.data.metadata.lastUpdate = new Date().toISOString();
        
        const cloneableData = this.prepareDataForSave();
        const request = store.put({ id: 'data', data: cloneableData });

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
        reject(error);
      }
    });
  }

  // ===========================================
  // MÉTODOS LEGADOS PARA COMPATIBILIDADE
  // ===========================================

  // Manter compatibilidade com código existente
  async addCliente(cliente: Cliente): Promise<number> {
    await this.ensureConnection();
    return this.clientes.add(cliente);
  }

  async getClientes(): Promise<Cliente[]> {
    await this.ensureConnection();
    return this.clientes.getAll();
  }

  async updateCliente(cliente: Cliente): Promise<void> {
    await this.ensureConnection();
    return this.clientes.update(cliente);
  }

  async deleteCliente(id: number): Promise<void> {
    await this.ensureConnection();
    return this.clientes.delete(id);
  }

  // ===========================================
  // MÉTODOS CRUD - VEÍCULOS
  // ===========================================

  async addVeiculo(veiculo: Veiculo): Promise<number> {
    await this.ensureConnection();
    Validators.validateVeiculo(veiculo);

    const veiculoExistente = this.data.veiculos.find(v => v.placa === veiculo.placa);
    if (veiculoExistente) {
      throw new Error('Já existe um veículo cadastrado com esta placa');
    }

    const clienteExiste = this.data.clientes.some(c => c.id === veiculo.clienteId);
    if (!clienteExiste) {
      throw new Error('O cliente informado não existe');
    }

    const id = Math.max(0, ...this.data.veiculos.map(v => v.id || 0)) + 1;
    veiculo.id = id;
    this.data.veiculos.push({ ...veiculo });
    await this.saveData();
    return id;
  }

  async getVeiculos(clienteId?: number): Promise<Veiculo[]> {
    await this.ensureConnection();
    return clienteId 
      ? this.data.veiculos.filter(v => v.clienteId === clienteId)
      : this.data.veiculos;
  }

  async updateVeiculo(veiculo: Veiculo): Promise<void> {
    await this.ensureConnection();
    if (!veiculo.id) throw new Error('ID do veículo não fornecido');
    
    Validators.validateVeiculo(veiculo);
    
    const index = this.data.veiculos.findIndex(v => v.id === veiculo.id);
    if (index === -1) throw new Error('Veículo não encontrado');
    
    const veiculoExistente = this.data.veiculos.find(v => v.placa === veiculo.placa && v.id !== veiculo.id);
    if (veiculoExistente) {
      throw new Error('Já existe um veículo cadastrado com esta placa');
    }
    
    this.data.veiculos[index] = { ...veiculo };
    await this.saveData();
  }

  async deleteVeiculo(id: number): Promise<void> {
    await this.ensureConnection();
    
    const servicosAssociados = this.data.servicos.some(s => s.veiculoId === id);
    const ordensAssociadas = this.data.ordensServico.some(os => os.veiculoId === id);
    
    if (servicosAssociados || ordensAssociadas) {
      throw new Error('Não é possível excluir o veículo pois existem serviços ou ordens de serviço associados a ele');
    }

    this.data.veiculos = this.data.veiculos.filter(v => v.id !== id);
    await this.saveData();
  }

  // ===========================================
  // MÉTODOS CRUD - SERVIÇOS
  // ===========================================

  async addServico(servico: Servico): Promise<number> {
    await this.ensureConnection();
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
    await this.saveData();
    return id;
  }

  async getServicos(veiculoId?: number): Promise<Servico[]> {
    await this.ensureConnection();
    return veiculoId
      ? this.data.servicos.filter(s => s.veiculoId === veiculoId)
      : this.data.servicos;
  }

  async updateServico(servico: Servico): Promise<void> {
    await this.ensureConnection();
    if (!servico.id) throw new Error('ID do serviço não fornecido');
    
    Validators.validateServico(servico);
    
    const index = this.data.servicos.findIndex(s => s.id === servico.id);
    if (index === -1) throw new Error('Serviço não encontrado');
    
    if (servico.data instanceof Date) {
      servico.data = servico.data.toISOString();
    }
    
    this.data.servicos[index] = { ...servico };
    await this.saveData();
  }

  async deleteServico(id: number): Promise<void> {
    await this.ensureConnection();
    
    const servicoEmUso = this.data.itensOrdemServico.some(item => 
      item.tipo === 'servico' && item.itemId === id
    );
    
    if (servicoEmUso) {
      throw new Error('Não é possível excluir o serviço pois ele está sendo usado em uma ou mais ordens de serviço');
    }

    this.data.servicos = this.data.servicos.filter(s => s.id !== id);
    await this.saveData();
  }

  // ===========================================
  // MÉTODOS CRUD - PEÇAS
  // ===========================================

  async addPeca(peca: Peca): Promise<number> {
    await this.ensureConnection();
    Validators.validatePeca(peca);

    const pecaExistente = this.data.pecas.find(p => p.codigo === peca.codigo);
    if (pecaExistente) {
      throw new Error('Já existe uma peça cadastrada com este código');
    }

    const id = Math.max(0, ...this.data.pecas.map(p => p.id || 0)) + 1;
    peca.id = id;
    peca.status = Validators.calcularStatusPeca(peca);
    
    this.data.pecas.push({ ...peca });
    await this.saveData();
    return id;
  }

  async getPecas(): Promise<Peca[]> {
    await this.ensureConnection();
    return this.data.pecas;
  }

  async updatePeca(peca: Peca): Promise<void> {
    await this.ensureConnection();
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
    await this.saveData();
  }

  async deletePeca(id: number): Promise<void> {
    await this.ensureConnection();
    
    const pecaEmUso = this.data.itensOrdemServico.some(item => 
      item.tipo === 'peca' && item.itemId === id
    );
    
    if (pecaEmUso) {
      throw new Error('Não é possível excluir a peça pois ela está sendo usada em uma ou mais ordens de serviço');
    }

    this.data.pecas = this.data.pecas.filter(p => p.id !== id);
    await this.saveData();
  }

  // ===========================================
  // MÉTODOS CRUD - ORDENS DE SERVIÇO
  // ===========================================

  async addOrdemServico(ordemServico: OrdemServico): Promise<number> {
    await this.ensureConnection();
    
    await this.validarEstoqueItens(ordemServico.itens);
    
    const id = Math.max(0, ...this.data.ordensServico.map(os => os.id || 0)) + 1;
    const ano = new Date().getFullYear();
    const ultimaOS = this.data.ordensServico.sort((a, b) => b.numero.localeCompare(a.numero))[0];
    const sequencial = ultimaOS ? parseInt(ultimaOS.numero.split('-')[2]) + 1 : 1;
    
    ordemServico.id = id;
    ordemServico.numero = `OS-${ano}-${String(sequencial).padStart(4, '0')}`;
    
    for (const item of ordemServico.itens) {
      if (item.tipo === 'peca') {
        await this.atualizarEstoquePeca(item.itemId, item.quantidade);
      }
    }
    
    this.data.ordensServico.push(ordemServico);
    ordemServico.itens.forEach(item => {
      const itemId = Math.max(0, ...this.data.itensOrdemServico.map(i => i.id || 0)) + 1;
      item.id = itemId;
      item.ordemServicoId = id;
      this.data.itensOrdemServico.push(item);
    });
    
    await this.saveData();
    return id;
  }

  async getOrdensServico(): Promise<OrdemServico[]> {
    await this.ensureConnection();
    return this.data.ordensServico.map(os => ({
      ...os,
      itens: this.data.itensOrdemServico.filter(item => item.ordemServicoId === os.id)
    }));
  }

  async updateOrdemServico(ordemServico: OrdemServico): Promise<void> {
    await this.ensureConnection();
    if (!ordemServico.id) throw new Error('ID da ordem de serviço não fornecido');

    const index = this.data.ordensServico.findIndex(os => os.id === ordemServico.id);
    if (index === -1) throw new Error('Ordem de serviço não encontrada');

    const itensAntigos = this.data.itensOrdemServico.filter(
      item => item.ordemServicoId === ordemServico.id
    );

    for (const itemAntigo of itensAntigos) {
      if (itemAntigo.tipo === 'peca') {
        await this.restaurarEstoquePeca(itemAntigo.itemId, itemAntigo.quantidade);
      }
    }

    await this.validarEstoqueItens(ordemServico.itens);

    for (const item of ordemServico.itens) {
      if (item.tipo === 'peca') {
        await this.atualizarEstoquePeca(item.itemId, item.quantidade);
      }
    }

    this.data.itensOrdemServico = this.data.itensOrdemServico.filter(
      item => item.ordemServicoId !== ordemServico.id
    );

    ordemServico.itens.forEach(item => {
      const itemId = Math.max(0, ...this.data.itensOrdemServico.map(i => i.id || 0)) + 1;
      item.id = itemId;
      item.ordemServicoId = ordemServico.id!;
      this.data.itensOrdemServico.push({ ...item });
    });

    this.data.ordensServico[index] = { ...ordemServico };
    await this.saveData();
  }

  async deleteOrdemServico(id: number): Promise<void> {
    await this.ensureConnection();

    const index = this.data.ordensServico.findIndex(os => os.id === id);
    if (index === -1) throw new Error('Ordem de serviço não encontrada');

    const itens = this.data.itensOrdemServico.filter(item => item.ordemServicoId === id);
    for (const item of itens) {
      if (item.tipo === 'peca') {
        await this.restaurarEstoquePeca(item.itemId, item.quantidade);
      }
    }

    this.data.itensOrdemServico = this.data.itensOrdemServico.filter(
      item => item.ordemServicoId !== id
    );

    this.data.ordensServico.splice(index, 1);
    await this.saveData();
  }

  // ===========================================
  // MÉTODOS DE GERENCIAMENTO DE ESTOQUE
  // ===========================================

  private async atualizarEstoquePeca(pecaId: number, quantidadeUtilizada: number): Promise<void> {
    const index = this.data.pecas.findIndex(p => p.id === pecaId);
    if (index === -1) {
      throw new Error(`Peça com ID ${pecaId} não encontrada`);
    }

    const peca = this.data.pecas[index];
    if (peca.quantidadeEstoque < quantidadeUtilizada) {
      throw new Error(`Estoque insuficiente para a peça ${peca.nome}. Disponível: ${peca.quantidadeEstoque}, Necessário: ${quantidadeUtilizada}`);
    }

    peca.quantidadeEstoque -= quantidadeUtilizada;
    peca.status = Validators.calcularStatusPeca(peca);
  }

  private async restaurarEstoquePeca(pecaId: number, quantidadeRestaurar: number): Promise<void> {
    const index = this.data.pecas.findIndex(p => p.id === pecaId);
    if (index !== -1) {
      const peca = this.data.pecas[index];
      peca.quantidadeEstoque += quantidadeRestaurar;
      peca.status = Validators.calcularStatusPeca(peca);
    }
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
}

// ===========================================
// EXPORTAÇÕES
// ===========================================

const db = new OficinaDB();
export { db };
export type { Cliente, Veiculo, Servico, Peca, StatusPeca, OrdemServico, ItemOrdemServico };
