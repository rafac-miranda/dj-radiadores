<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Peças</h2>
      <div class="flex gap-2">
        <button @click="mostrarFiltros = !mostrarFiltros"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>{{ mostrarFiltros ? '' : '' }}</span>
        </button>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center space-x-2"
          @click="showModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Nova Peça</span>
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div v-if="mostrarFiltros" class="bg-white p-4 rounded-lg shadow-md mb-6 transition-all duration-300 ease-in-out">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Buscar por nome</label>
          <input type="text" v-model="filtros.nome" placeholder="Digite para buscar..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select v-model="filtros.categoria"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Todas as categorias</option>
            <option value="motor">Motor</option>
            <option value="suspensao">Suspensão</option>
            <option value="freios">Freios</option>
            <option value="eletrica">Elétrica</option>
            <option value="carroceria">Carroceria</option>
            <option value="outros">Outros</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filtros.status"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Todos os status</option>
            <option value="disponivel">Disponível</option>
            <option value="em_falta">Em falta</option>
            <option value="reservada">Reservada</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="limparFiltros"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Peças -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th @click="setSorting('codigo')" :class="getSortClass('codigo')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
                <div class="flex items-center space-x-1">
                  <span>Código</span>
                  <span class="text-gray-400">{{ getSortIcon('codigo') }}</span>
                </div>
              </th>
              <th @click="setSorting('nome')" :class="getSortClass('nome')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
                <div class="flex items-center space-x-1">
                  <span>Nome</span>
                  <span class="text-gray-400">{{ getSortIcon('nome') }}</span>
                </div>
              </th>
              <th @click="setSorting('precoUnitario')" :class="getSortClass('precoUnitario')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
                <div class="flex items-center space-x-1">
                  <span>Preço</span>
                  <span class="text-gray-400">{{ getSortIcon('precoUnitario') }}</span>
                </div>
              </th>
              <th @click="setSorting('quantidadeEstoque')" :class="getSortClass('quantidadeEstoque')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
                <div class="flex items-center space-x-1">
                  <span>Estoque</span>
                  <span class="text-gray-400">{{ getSortIcon('quantidadeEstoque') }}</span>
                </div>
              </th>
              <th @click="setSorting('status')" :class="getSortClass('status')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
                <div class="flex items-center space-x-1">
                  <span>Status</span>
                  <span class="text-gray-400">{{ getSortIcon('status') }}</span>
                </div>
              </th>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="peca in pecas" :key="peca.id" class="hover:bg-gray-50">
              <td class="py-4 px-6 whitespace-nowrap">{{ peca.codigo }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ peca.nome }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ formatarMoeda(peca.precoUnitario) }}</td>
              <td class="py-4 px-6 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  peca.quantidadeEstoque <= peca.estoqueMinimo
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                ]">
                  {{ peca.quantidadeEstoque }}
                </span>
              </td>
              <td class="py-4 px-6 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  {
                    'bg-red-100 text-red-800': peca.status === 'indisponivel',
                    'bg-yellow-100 text-yellow-800': peca.status === 'baixo_estoque',
                    'bg-green-100 text-green-800': peca.status === 'disponivel'
                  }
                ]">
                  {{ formatarStatus(peca.status) }}
                </span>
              </td>
              <td class="py-4 px-6 whitespace-nowrap space-x-2">
                <button @click="editarPeca(peca)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                <button @click="excluirPeca(peca.id)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Excluir
                </button>
              </td>
            </tr>
            <tr v-if="pecas.length === 0">
              <td colspan="6" class="py-4 px-6 text-center text-gray-500">Nenhuma peça cadastrada</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Nova Peça -->
    <Transition enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
      <div v-if="showModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6 transform transition-all">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">{{ pecaEmEdicao.id ? 'Editar' : 'Nova' }} Peça</h3>
            <button @click="fecharModal" class="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="salvarPeca" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Código</label>
              <input v-model="pecaEmEdicao.codigo" type="text"
                class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': !pecaEmEdicao.codigo && tentouSalvar }" required />
              <p v-if="!pecaEmEdicao.codigo && tentouSalvar" class="mt-1 text-sm text-red-600">
                Código é obrigatório
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input v-model="pecaEmEdicao.nome" type="text"
                class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': !pecaEmEdicao.nome && tentouSalvar }" required />
              <p v-if="!pecaEmEdicao.nome && tentouSalvar" class="mt-1 text-sm text-red-600">
                Nome é obrigatório
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea v-model="pecaEmEdicao.descricao"
                class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm" rows="3"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Preço Unitário</label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input v-model="pecaEmEdicao.precoUnitario" type="number" step="0.01"
                  class="block w-full pl-10 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-300': !pecaEmEdicao.precoUnitario && tentouSalvar }" required />
              </div>
              <p v-if="!pecaEmEdicao.precoUnitario && tentouSalvar" class="mt-1 text-sm text-red-600">
                Preço unitário é obrigatório
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Quantidade em Estoque</label>
                <input v-model="pecaEmEdicao.quantidadeEstoque" type="number" min="0"
                  class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-300': pecaEmEdicao.quantidadeEstoque === undefined && tentouSalvar }"
                  required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Estoque Mínimo</label>
                <input v-model="pecaEmEdicao.estoqueMinimo" type="number" min="0"
                  class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-300': pecaEmEdicao.estoqueMinimo === undefined && tentouSalvar }" required />
              </div>
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button type="button"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                @click="fecharModal">
                Cancelar
              </button>
              <button type="submit"
                class="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="isLoading">
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                {{ isLoading ? 'Salvando...' : 'Salvar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Toast Mensagem -->
    <TransitionGroup enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="mensagem" key="mensagem" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm w-full z-50"
        :class="{
          'bg-red-100 text-red-700 border border-red-200': mensagem.tipo === 'erro',
          'bg-green-100 text-green-700 border border-green-200': mensagem.tipo === 'sucesso'
        }">
        <div class="flex items-center">
          <div v-if="mensagem.tipo === 'sucesso'" class="bg-green-100 text-green-800 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div v-if="mensagem.tipo === 'erro'" class="bg-red-100 text-red-800 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">{{ mensagem.texto }}</p>
          </div>
          <button @click="mensagem = null" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { db, type Peca, type StatusPeca } from '../services/db';
import { useSorting } from '../composables/useSorting';

const pecasOriginais = ref<Peca[]>([]);
const { setSorting, sortedData, getSortClass, getSortIcon } = useSorting<Peca>('codigo');

// Objeto para armazenar os filtros
const filtros = ref({
  nome: '',
  categoria: '',
  status: ''
});

// Novo ref para controlar a visibilidade dos filtros
const mostrarFiltros = ref(false);

// Função para limpar os filtros
const limparFiltros = () => {
  filtros.value = {
    nome: '',
    categoria: '',
    status: ''
  };
};

// Computed property para filtrar as peças de acordo com os filtros aplicados
const pecasFiltradas = computed(() => {
  return pecasOriginais.value.filter(peca => {
    // Filtro por nome
    if (filtros.value.nome && !peca.nome.toLowerCase().includes(filtros.value.nome.toLowerCase())) {
      return false;
    }

    // Filtro por categoria
    if (filtros.value.categoria && peca.descricao && peca.descricao.toLowerCase().includes(filtros.value.categoria.toLowerCase())) {
      return false;
    }

    // Filtro por status
    if (filtros.value.status && peca.status !== filtros.value.status) {
      return false;
    }

    return true;
  });
});

// Computed property que aplica ordenação às peças filtradas
const pecas = computed(() => {
  return sortedData.value(pecasFiltradas.value);
});
const showModal = ref(false);
const isLoading = ref(false);
const tentouSalvar = ref(false);
const mensagem = ref<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

const pecaEmEdicao = ref<Peca>({
  codigo: '',
  nome: '',
  descricao: '',
  precoUnitario: 0,
  quantidadeEstoque: 0,
  estoqueMinimo: 0,
  status: 'disponivel'
});

const formatarMoeda = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const formatarStatus = (status: StatusPeca) => {
  const statusMap: Record<StatusPeca, string> = {
    disponivel: 'Disponível',
    baixo_estoque: 'Baixo Estoque',
    indisponivel: 'Indisponível'
  };
  return statusMap[status];
};

const carregarDados = async () => {
  try {
    console.log('Carregando dados das peças...');
    const pecasData = await db.getPecas();
    pecasOriginais.value = [...pecasData];
    console.log('Dados carregados com sucesso:', pecasOriginais.value.length, 'peças');
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    mensagem.value = {
      texto: 'Erro ao carregar dados',
      tipo: 'erro'
    };
  }
};

const limparFormulario = () => {
  pecaEmEdicao.value = {
    codigo: '',
    nome: '',
    descricao: '',
    precoUnitario: 0,
    quantidadeEstoque: 0,
    estoqueMinimo: 0,
    status: 'disponivel'
  };
  tentouSalvar.value = false;
};

const fecharModal = () => {
  showModal.value = false;
  limparFormulario();
};

const editarPeca = (peca: Peca) => {
  if (!peca || !peca.id) {
    mensagem.value = {
      texto: 'Erro: Peça inválida para edição',
      tipo: 'erro'
    };
    return;
  }

  pecaEmEdicao.value = { ...peca };
  showModal.value = true;
  tentouSalvar.value = false;
};

const validarFormulario = () => {
  const erros = [];

  // Validação do código
  if (!pecaEmEdicao.value.codigo?.trim()) {
    erros.push('Código é obrigatório');
  } else if (pecaEmEdicao.value.codigo.length < 3) {
    erros.push('Código deve ter no mínimo 3 caracteres');
  }

  // Validação do nome
  if (!pecaEmEdicao.value.nome?.trim()) {
    erros.push('Nome é obrigatório');
  } else if (pecaEmEdicao.value.nome.length < 3) {
    erros.push('Nome deve ter no mínimo 3 caracteres');
  }

  // Validação do preço unitário
  if (!pecaEmEdicao.value.precoUnitario) {
    erros.push('Preço unitário é obrigatório');
  } else if (pecaEmEdicao.value.precoUnitario <= 0) {
    erros.push('Preço unitário deve ser maior que zero');
  } else if (pecaEmEdicao.value.precoUnitario > 1000000) {
    erros.push('Preço unitário não pode ser maior que R$ 1.000.000,00');
  }

  // Validação da quantidade em estoque
  if (pecaEmEdicao.value.quantidadeEstoque === undefined || pecaEmEdicao.value.quantidadeEstoque === null) {
    erros.push('Quantidade em estoque é obrigatória');
  } else if (pecaEmEdicao.value.quantidadeEstoque < 0) {
    erros.push('Quantidade em estoque não pode ser negativa');
  } else if (pecaEmEdicao.value.quantidadeEstoque > 99999) {
    erros.push('Quantidade em estoque não pode ser maior que 99.999');
  }

  // Validação do estoque mínimo
  if (pecaEmEdicao.value.estoqueMinimo === undefined || pecaEmEdicao.value.estoqueMinimo === null) {
    erros.push('Estoque mínimo é obrigatório');
  } else if (pecaEmEdicao.value.estoqueMinimo < 0) {
    erros.push('Estoque mínimo não pode ser negativo');
  } else if (pecaEmEdicao.value.estoqueMinimo > pecaEmEdicao.value.quantidadeEstoque) {
    erros.push('Estoque mínimo não pode ser maior que a quantidade em estoque');
  }

  return erros;
};

const atualizarStatusPeca = (peca: Peca): StatusPeca => {
  // Verifica se a quantidade em estoque é válida
  const quantidadeEstoque = Number(peca.quantidadeEstoque);
  const estoqueMinimo = Number(peca.estoqueMinimo);

  // Se não houver estoque ou for inválido, marca como indisponível
  if (!quantidadeEstoque || quantidadeEstoque <= 0 || isNaN(quantidadeEstoque)) {
    return 'indisponivel';
  }

  // Se o estoque estiver abaixo ou igual ao mínimo, marca como baixo estoque
  if (estoqueMinimo >= 0 && quantidadeEstoque <= estoqueMinimo) {
    return 'baixo_estoque';
  }

  // Se passar por todas as validações, marca como disponível
  return 'disponivel';
};

const salvarPeca = async () => {
  console.log('Iniciando salvamento da peça');
  tentouSalvar.value = true;

  const errosValidacao = validarFormulario();
  if (errosValidacao.length > 0) {
    mensagem.value = {
      texto: errosValidacao.join('\n'),
      tipo: 'erro'
    };
    return;
  }

  try {
    isLoading.value = true;
    mensagem.value = null; // Limpa mensagens anteriores

    // Atualizar status com base no estoque
    const status = atualizarStatusPeca(pecaEmEdicao.value);
    const pecaAtualizada = {
      ...pecaEmEdicao.value,
      status,
      precoUnitario: Number(pecaEmEdicao.value.precoUnitario),
      quantidadeEstoque: Number(pecaEmEdicao.value.quantidadeEstoque),
      estoqueMinimo: Number(pecaEmEdicao.value.estoqueMinimo)
    };

    console.log('Peça a ser salva:', pecaAtualizada);

    if (pecaEmEdicao.value.id) {
      console.log('Atualizando peça:', pecaAtualizada);
      await db.updatePeca(pecaAtualizada);

      // Atualizar a lista de peças localmente
      const index = pecasOriginais.value.findIndex(p => p.id === pecaAtualizada.id);
      if (index !== -1) {
        pecasOriginais.value[index] = { ...pecaAtualizada };
        // Forçar reatividade criando uma nova referência para o array
        pecasOriginais.value = [...pecasOriginais.value];
      }

      mensagem.value = {
        texto: `Peça "${pecaAtualizada.nome}" atualizada com sucesso!`,
        tipo: 'sucesso'
      };
    } else {
      const novaPecaId = await db.addPeca(pecaAtualizada);

      // Adicionar a nova peça à lista local
      const novaPeca = {
        ...pecaAtualizada,
        id: novaPecaId
      };
      pecasOriginais.value.push(novaPeca);
      // Forçar reatividade criando uma nova referência para o array
      pecasOriginais.value = [...pecasOriginais.value];

      mensagem.value = {
        texto: `Peça "${pecaAtualizada.nome}" cadastrada com sucesso!`,
        tipo: 'sucesso'
      };
    }

    fecharModal();
  } catch (error) {
    console.error('Erro ao salvar peça:', error);
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao salvar a peça',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

const excluirPeca = async (id?: number) => {
  if (!id) return;

  if (!confirm('Tem certeza que deseja excluir esta peça?')) return;

  try {
    isLoading.value = true;
    console.log('Excluindo peça com ID:', id);

    await db.deletePeca(id);

    // Remover a peça da lista local
    pecasOriginais.value = pecasOriginais.value.filter(p => p.id !== id);

    mensagem.value = {
      texto: 'Peça excluída com sucesso!',
      tipo: 'sucesso'
    };

    // Recarregar todas as peças para garantir sincronização
    await carregarDados();
  } catch (error) {
    console.error('Erro ao excluir peça:', error);
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao excluir a peça',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

// Inicializar banco de dados e carregar lista inicial de peças
onMounted(async () => {
  try {
    console.log('Inicializando componente PecasList...');
    await db.init();
    console.log('Banco de dados inicializado com sucesso');
    await carregarDados();
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    mensagem.value = {
      texto: 'Erro ao inicializar o banco de dados',
      tipo: 'erro'
    };
  }
});

// Adicionar um watcher para depuração
watch(pecas, (newValue) => {
  console.log('Lista de peças atualizada:', newValue.length, 'itens');
});
</script>