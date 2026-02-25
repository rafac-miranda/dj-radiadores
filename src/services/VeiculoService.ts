import type { Veiculo, OficinaData } from './types';
import { Validators } from './validators';

export class VeiculoService {
  constructor(private data: OficinaData, private saveDataCallback: () => Promise<void>) {}

  async add(veiculo: Veiculo): Promise<number> {
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
    await this.saveDataCallback();
    return id;
  }

  async getAll(): Promise<Veiculo[]> {
    return this.data.veiculos;
  }

  async getById(id: number): Promise<Veiculo | undefined> {
    return this.data.veiculos.find(v => v.id === id);
  }

  async getByCliente(clienteId: number): Promise<Veiculo[]> {
    return this.data.veiculos.filter(v => v.clienteId === clienteId);
  }

  async update(veiculo: Veiculo): Promise<void> {
    if (!veiculo.id) throw new Error('ID do veículo não fornecido');
    
    Validators.validateVeiculo(veiculo);
    
    const index = this.data.veiculos.findIndex(v => v.id === veiculo.id);
    if (index === -1) throw new Error('Veículo não encontrado');
    
    const veiculoExistente = this.data.veiculos.find(v => v.placa === veiculo.placa && v.id !== veiculo.id);
    if (veiculoExistente) {
      throw new Error('Já existe um veículo cadastrado com esta placa');
    }
    
    this.data.veiculos[index] = { ...veiculo };
    await this.saveDataCallback();
  }

  async delete(id: number): Promise<void> {
    const servicosAssociados = this.data.servicos.some(s => s.veiculoId === id);
    const ordensAssociadas = this.data.ordensServico.some(os => os.veiculoId === id);
    
    if (servicosAssociados || ordensAssociadas) {
      throw new Error('Não é possível excluir o veículo pois existem serviços ou ordens de serviço associados a ele');
    }

    this.data.veiculos = this.data.veiculos.filter(v => v.id !== id);
    await this.saveDataCallback();
  }

  async search(termo: string): Promise<Veiculo[]> {
    const termoLower = termo.toLowerCase();
    return this.data.veiculos.filter(v => 
      v.placa.toLowerCase().includes(termoLower) ||
      v.modelo.toLowerCase().includes(termoLower) ||
      v.ano.toString().includes(termo)
    );
  }
}
