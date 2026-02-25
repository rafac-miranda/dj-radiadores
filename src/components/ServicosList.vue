<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Serviços</h2>
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
          <span>Novo Serviço</span>
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div v-if="mostrarFiltros" class="mb-4 bg-white p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Buscar por descrição</label>
          <input type="text" v-model="filtros.descricao" placeholder="Digite para buscar..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Data inicial</label>
          <input type="date" v-model="filtros.dataInicial"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Data final</label>
          <input type="date" v-model="filtros.dataFinal"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex items-end">
          <button @click="limparFiltros"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Serviços -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th @click="setSorting('descricao')" :class="getSortClass('descricao')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                <div class="flex items-center space-x-1">
                  <span>Descrição</span>
                  <span class="text-gray-400">{{ getSortIcon('descricao') }}</span>
                </div>
              </th>
              <th @click="setSorting('data')" :class="getSortClass('data')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                <div class="flex items-center space-x-1">
                  <span>Data</span>
                  <span class="text-gray-400">{{ getSortIcon('data') }}</span>
                </div>
              </th>
              <th @click="setSorting('valor')" :class="getSortClass('valor')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                <div class="flex items-center space-x-1">
                  <span>Valor</span>
                  <span class="text-gray-400">{{ getSortIcon('valor') }}</span>
                </div>
              </th>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="servico in servicosComDetalhesOrdenados" :key="servico.id" class="hover:bg-gray-50">
              <td class="py-4 px-6 whitespace-nowrap">{{ servico.descricao }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ formatarData(servico.data) }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ formatarMoeda(servico.valor) }}</td>
              <td class="py-4 px-6 whitespace-nowrap space-x-2">
                <button @click="editarServico(servico)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                <button @click="excluirServico(servico.id)"
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
            <tr v-if="servicosComDetalhes.length === 0">
              <td colspan="6" class="py-4 px-6 text-center text-gray-500">Nenhum serviço cadastrado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Novo Serviço -->
    <div v-if="showModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800">Novo Serviço</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="salvarServico" class="space-y-4">


          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea v-model="novoServico.descricao"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': !novoServico.descricao && tentouSalvar }" placeholder="Descrição do serviço"
              rows="3" required></textarea>
            <p v-if="!novoServico.descricao && tentouSalvar" class="mt-1 text-sm text-red-600">Informe a descrição do
              serviço</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input v-model="novoServico.data" type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': !novoServico.data && tentouSalvar }" required />
            <p v-if="!novoServico.data && tentouSalvar" class="mt-1 text-sm text-red-600">Informe a data do serviço</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Valor</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">R$</span>
              </div>
              <input v-model="novoServico.valor" type="number" step="0.01" placeholder="0.00"
                class="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': !novoServico.valor && tentouSalvar }" required />
            </div>
            <p v-if="!novoServico.valor && tentouSalvar" class="mt-1 text-sm text-red-600">Informe o valor do serviço
            </p>
          </div>



          <div class="flex justify-end space-x-3 mt-6">
            <button type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              @click="showModal = false">
              Cancelar
            </button>
            <button type="submit"
              class="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
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

    <!-- Modal Editar Serviço -->
    <div v-if="showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800">Editar Serviço</h3> <button
            @click="showEditModal = false; limparFormularioEdicao()" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="salvarEdicao" class="space-y-4">


          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea v-model="servicoEmEdicao.descricao"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': !servicoEmEdicao.descricao && tentouSalvar }"
              placeholder="Descrição do serviço" rows="3" required></textarea>
            <p v-if="!servicoEmEdicao.descricao && tentouSalvar" class="mt-1 text-sm text-red-600">Informe a descrição
              do serviço</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input v-model="servicoEmEdicao.data" type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': !servicoEmEdicao.data && tentouSalvar }" required />
            <p v-if="!servicoEmEdicao.data && tentouSalvar" class="mt-1 text-sm text-red-600">Informe a data do serviço
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Valor</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">R$</span>
              </div>
              <input v-model="servicoEmEdicao.valor" type="number" step="0.01" placeholder="0.00"
                class="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': !servicoEmEdicao.valor && tentouSalvar }" required />
            </div>
            <p v-if="!servicoEmEdicao.valor && tentouSalvar" class="mt-1 text-sm text-red-600">Informe o valor do
              serviço</p>
          </div>



          <div class="flex justify-end space-x-3 mt-6">
            <button type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              @click="showEditModal = false; limparFormularioEdicao()">
              Cancelar
            </button>
            <button type="submit"
              class="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
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

    <!-- Toast Mensagem -->
    <div v-if="mensagem" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm w-full z-50" :class="{
      'bg-red-100 text-red-700 border border-red-200': mensagem.tipo === 'erro',
      'bg-green-100 text-green-700 border border-green-200': mensagem.tipo === 'sucesso'
    }">
      <div class="flex items-center">
        <div v-if="mensagem.tipo === 'sucesso'" class="bg-green-100 text-green-800 rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div v-if="mensagem.tipo === 'erro'" class="bg-red-100 text-red-800 rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium">{{ mensagem.texto }}</p>
        </div>
        <button @click="mensagem = null" class="text-gray-400 hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { db, type Servico } from '../services/db';
import { useSorting } from '../composables/useSorting';

// Composable de ordenação
const { setSorting, sortedData, getSortClass, getSortIcon } = useSorting<Servico>('descricao');

const servicos = ref<Servico[]>([]);
const showModal = ref(false);
const showEditModal = ref(false);
const isLoading = ref(false);
const tentouSalvar = ref(false);
const mostrarFiltros = ref(false);

const novoServico = ref<Omit<Servico, 'id'>>({
  descricao: '',
  data: new Date(),
  valor: 0,
  veiculoId: 1,
  status: 'pendente'
});
const servicoEmEdicao = ref<Servico>({
  id: undefined,
  descricao: '',
  data: new Date(),
  valor: 0,
  veiculoId: 1,
  status: 'pendente'
});
const mensagem = ref<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

// Objeto para armazenar os filtros
const filtros = ref({
  descricao: '',
  dataInicial: '',
  dataFinal: ''
});

// Função para limpar os filtros
const limparFiltros = () => {
  filtros.value = {
    descricao: '',
    dataInicial: '',
    dataFinal: ''
  };
};

// Computed property para filtrar os serviços de acordo com os filtros aplicados
const servicosComDetalhes = computed(() => {
  return servicos.value
    .filter(servico => {
      // Filtro por descrição
      if (filtros.value.descricao && !servico.descricao.toLowerCase().includes(filtros.value.descricao.toLowerCase())) {
        return false;
      }

      // Filtro por data inicial
      if (filtros.value.dataInicial) {
        const dataServico = new Date(servico.data);
        const dataInicial = new Date(filtros.value.dataInicial);
        dataInicial.setHours(0, 0, 0, 0);
        if (dataServico < dataInicial) {
          return false;
        }
      }

      // Filtro por data final
      if (filtros.value.dataFinal) {
        const dataServico = new Date(servico.data);
        const dataFinal = new Date(filtros.value.dataFinal);
        dataFinal.setHours(23, 59, 59, 999);
        if (dataServico > dataFinal) {
          return false;
        }
      }

      return true;
    })
    .map(s => ({
      ...s
    }));
});

// Serviços filtrados e ordenados
const servicosComDetalhesOrdenados = computed(() => {
  return sortedData.value(servicosComDetalhes.value);
});

const formatarData = (data: string | Date) => {
  if (!data) return '';
  // Se a data for uma string, converte para Date
  const dataObj = typeof data === 'string' ? new Date(data) : data;
  // Verifica se é uma data válida
  if (isNaN(dataObj.getTime())) return '';
  return dataObj.toLocaleDateString('pt-BR');
};

const converterParaDataISO = (data: string | Date) => {
  if (!data) return '';
  // Se a data for uma string, converte para Date
  const dataObj = typeof data === 'string' ? new Date(data) : data;
  // Verifica se é uma data válida
  if (isNaN(dataObj.getTime())) return '';
  return dataObj.toISOString().split('T')[0];  // Retorna no formato YYYY-MM-DD
};

const formatarMoeda = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const carregarDados = async () => {
  try {
    console.log('Carregando dados dos serviços...');
    const servicosData = await db.getServicos();

    // Atualiza os dados com novas referências para garantir reatividade
    servicos.value = [...servicosData];

    // Forçar atualização da interface após as mudanças de dados
    await nextTick();

    console.log('Dados carregados com sucesso:', servicos.value.length, 'serviços');
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    mensagem.value = {
      texto: 'Erro ao carregar dados',
      tipo: 'erro'
    };
  }
};

const salvarServico = async () => {
  tentouSalvar.value = true;

  if (!novoServico.value.descricao || !novoServico.value.data || !novoServico.value.valor) {
    mensagem.value = {
      texto: 'Por favor, preencha todos os campos obrigatórios',
      tipo: 'erro'
    };
    return;
  }

  try {
    isLoading.value = true;
    await db.addServico(novoServico.value);
    showModal.value = false;
    tentouSalvar.value = false;
    mensagem.value = {
      texto: 'Serviço cadastrado com sucesso!',
      tipo: 'sucesso'
    };
    // Recarrega os dados após a mensagem
    await carregarDados();
    // Limpar formulário
    novoServico.value = {
      descricao: '',
      data: new Date(),
      valor: 0,
      veiculoId: 1,
      status: 'pendente'
    };
  } catch (error) {
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao cadastrar o serviço',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

const salvarEdicao = async () => {
  if (!servicoEmEdicao.value || !servicoEmEdicao.value.id) {
    mensagem.value = {
      texto: 'Erro: Serviço inválido para edição',
      tipo: 'erro'
    };
    return;
  }

  tentouSalvar.value = true;

  // Validar campos obrigatórios
  if (!servicoEmEdicao.value.descricao ||
    !servicoEmEdicao.value.data ||
    servicoEmEdicao.value.valor === undefined ||
    servicoEmEdicao.value.valor === null) {
    mensagem.value = {
      texto: 'Por favor, preencha todos os campos obrigatórios',
      tipo: 'erro'
    };
    return;
  }

  try {
    isLoading.value = true;

    // Formata os dados antes de enviar
    const servicoAtualizado = {
      ...servicoEmEdicao.value,
      descricao: servicoEmEdicao.value.descricao.trim(),
      data: converterParaDataISO(servicoEmEdicao.value.data),
      valor: Number(servicoEmEdicao.value.valor)
    };

    console.log('Atualizando serviço:', servicoAtualizado);
    await db.updateServico(servicoAtualizado);

    // Atualiza localmente o serviço na lista
    const index = servicos.value.findIndex(s => s.id === servicoEmEdicao.value.id);
    if (index !== -1) {
      servicos.value[index] = { ...servicoAtualizado };
      // Forçar reatividade criando uma nova referência para o array
      servicos.value = [...servicos.value];
    }

    showEditModal.value = false;
    tentouSalvar.value = false;
    mensagem.value = {
      texto: 'Serviço atualizado com sucesso!',
      tipo: 'sucesso'
    };
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao atualizar o serviço',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

const limparFormularioEdicao = () => {
  servicoEmEdicao.value = {
    id: undefined,
    descricao: '',
    data: new Date(),
    valor: 0,
    veiculoId: 1,
    status: 'pendente'
  };
  tentouSalvar.value = false;
};

const editarServico = (servico: Servico) => {
  if (!servico || !servico.id) {
    mensagem.value = {
      texto: 'Erro: Serviço inválido para edição',
      tipo: 'erro'
    };
    return;
  }

  try {
    const dataServico = typeof servico.data === 'string'
      ? new Date(servico.data)
      : servico.data;

    if (isNaN(dataServico.getTime())) {
      mensagem.value = {
        texto: 'Data do serviço inválida',
        tipo: 'erro'
      };
      return;
    }

    servicoEmEdicao.value = {
      ...servico,
      data: dataServico.toISOString().split('T')[0],
      veiculoId: servico.veiculoId,
      status: servico.status
    };
    showEditModal.value = true;
    tentouSalvar.value = false;
  } catch (error) {
    mensagem.value = {
      texto: 'Erro ao preparar serviço para edição',
      tipo: 'erro'
    };
  }
};

const excluirServico = async (id?: number) => {
  if (!id) return;

  if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

  try {
    isLoading.value = true;
    await db.deleteServico(id);
    mensagem.value = {
      texto: 'Serviço excluído com sucesso!',
      tipo: 'sucesso'
    };
    await carregarDados();
  } catch (error) {
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao excluir o serviço',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};



onMounted(carregarDados);

</script>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
