export interface Cliente {
  id?: number;
  nome: string;
  telefone: string;
  email: string;
  [key: string]: string | number | undefined; // permite propriedades adicionais mas só de tipos serializáveis
}

export interface Veiculo {
  id?: number;
  clienteId: number;
  placa: string;
  modelo: string;
  ano: number;
}

export interface Servico {
  id?: number;
  veiculoId: number;
  descricao: string;
  data: Date | string; // Pode ser Date na aplicação ou string no armazenamento
  valor: number;
  status: 'pendente' | 'em_andamento' | 'concluido';
}

export interface Peca {
  id?: number;
  codigo: string;
  nome: string;
  descricao?: string;
  precoUnitario: number;
  quantidadeEstoque: number;
  estoqueMinimo: number;
  status: StatusPeca;
}

export interface ItemOrdemServico {
  id?: number;
  ordemServicoId: number;
  tipo: 'servico' | 'peca';
  itemId: number; // ID do serviço ou peça
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

export interface OrdemServico {
  id?: number;
  numero: string;
  veiculoId: number;
  dataAbertura: Date | string;
  dataFechamento?: Date | string;
  status: 'aberta' | 'em_andamento' | 'concluida' | 'cancelada';
  observacoes?: string;
  valorTotal: number;
  itens: ItemOrdemServico[];
}

export type StatusPeca = 'disponivel' | 'baixo_estoque' | 'indisponivel';

export interface OficinaData {
  clientes: Cliente[];
  veiculos: Veiculo[];
  servicos: Servico[];
  pecas: Peca[];
  ordensServico: OrdemServico[];
  itensOrdemServico: ItemOrdemServico[];
  metadata: {
    lastUpdate: string;
  };
}
