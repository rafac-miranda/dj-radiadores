import type { Cliente, Veiculo, Servico, Peca, StatusPeca } from './types';

export class Validators {
  static validateCliente(cliente: Cliente): void {
    if (!cliente.nome || cliente.nome.trim() === '') {
      throw new Error('O nome do cliente é obrigatório');
    }
    if (!cliente.telefone || cliente.telefone.trim() === '') {
      throw new Error('O telefone do cliente é obrigatório');
    }
    if (cliente.email && !cliente.email.includes('@')) {
      throw new Error('Email inválido');
    }
  }

  static validateVeiculo(veiculo: Veiculo): void {
    if (!veiculo.placa || veiculo.placa.trim() === '') {
      throw new Error('A placa do veículo é obrigatória');
    }
    if (!veiculo.modelo || veiculo.modelo.trim() === '') {
      throw new Error('O modelo do veículo é obrigatório');
    }
    if (!veiculo.ano || veiculo.ano < 1900 || veiculo.ano > new Date().getFullYear() + 1) {
      throw new Error('O ano do veículo é inválido');
    }
    if (!veiculo.clienteId) {
      throw new Error('O cliente do veículo é obrigatório');
    }
  }

  static validateServico(servico: Servico): void {
    if (!servico.descricao || servico.descricao.trim() === '') {
      throw new Error('A descrição do serviço é obrigatória');
    }
    if (!servico.valor || servico.valor <= 0) {
      throw new Error('O valor do serviço deve ser maior que zero');
    }
    if (!servico.veiculoId) {
      throw new Error('O veículo do serviço é obrigatório');
    }
    if (!servico.data) {
      throw new Error('A data do serviço é obrigatória');
    }
  }

  static validatePeca(peca: Peca): void {
    if (!peca.codigo || peca.codigo.trim().length < 3) {
      throw new Error('O código da peça deve ter no mínimo 3 caracteres');
    }
    if (!peca.nome || peca.nome.trim().length < 3) {
      throw new Error('O nome da peça deve ter no mínimo 3 caracteres');
    }
    if (peca.precoUnitario <= 0 || peca.precoUnitario > 1000000) {
      throw new Error('O preço unitário deve estar entre R$ 0,01 e R$ 1.000.000,00');
    }
    if (peca.quantidadeEstoque < 0 || peca.quantidadeEstoque > 99999) {
      throw new Error('A quantidade em estoque deve estar entre 0 e 99.999');
    }
    if (peca.estoqueMinimo < 0 || peca.estoqueMinimo > peca.quantidadeEstoque) {
      throw new Error('O estoque mínimo deve ser maior ou igual a 0 e menor que a quantidade em estoque');
    }
  }

  static calcularStatusPeca(peca: Peca): StatusPeca {
    if (!peca.quantidadeEstoque || peca.quantidadeEstoque <= 0) {
      return 'indisponivel';
    }
    if (peca.quantidadeEstoque <= peca.estoqueMinimo) {
      return 'baixo_estoque';
    }
    return 'disponivel';
  }

  static validarEstruturaDados(dados: any): dados is import('./types').OficinaData {
    return (
      dados &&
      Array.isArray(dados.clientes) &&
      Array.isArray(dados.veiculos) &&
      Array.isArray(dados.servicos) &&
      Array.isArray(dados.pecas) &&
      Array.isArray(dados.ordensServico) &&
      Array.isArray(dados.itensOrdemServico) &&
      dados.metadata &&
      typeof dados.metadata.lastUpdate === 'string'
    );
  }
}
